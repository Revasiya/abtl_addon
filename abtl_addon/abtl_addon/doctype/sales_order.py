# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from erpnext.erpnext_integrations.taxjar_integration import get_company_address_details
from erpnext.stock.doctype.item.item import get_item_defaults
from frappe.model.utils import get_fetch_values
from erpnext.setup.doctype.item_group.item_group import get_item_group_defaults
from frappe.model.mapper import get_mapped_doc
from frappe.utils.data import cstr, flt

def validate(doc,method):
    # items_zero_after_validate(doc)
    create_DN(doc)


def items_zero_after_validate(doc):
    for i in doc.items:
        if i.actual_qty == 0:
            frappe.throw(" This Item Actual Qty is Zero " + "<b style='color:red;'>"+ i.item_code + "</b>")
        elif i.qty > i.actual_qty:
            frappe.throw(" Item Less Than Actual Qty " + "<b style='color:red;'>"+ i.item_code + "</b>")
        
        if i.qty == 0:
            frappe.throw(" This Item Qty is Zero " + "<b style='color:red;'>"+ i.item_code + "</b>")





def create_DN(doc):
    if doc.workflow_state == "Approved":
        delivery_note = make_delivery_note(doc.name)
        delivery_note.allocate_advances_automatically = True
        delivery_note.insert()
        frappe.share.add("Delivery Note", delivery_note.name, user=frappe.session.user, read=1, write=1, share=1)
        frappe.msgprint(msg='Delivery Note Created Successfully',
                                title='Message',
                                indicator='green')
        

# Branch Wise Store Filter
@frappe.whitelist()
def branch_wise_store_filter(branch):
    store = []  
    warehouse = frappe.db.sql("select name from `tabWarehouse` where custom_branch = %s AND disabled = 0 AND is_group = 0", branch)
    for str in warehouse:
        store.append(str[0])
    return store


# Mode Of Payments Filter
@frappe.whitelist()
def mode_of_payment_filter(store):
    mode_payment = []  
    payment = frappe.db.sql("select mode_of_payment from `tabStore Payment Item` where parent = %s", store)
    for pay in payment:
        mode_payment.append(pay[0])
    return mode_payment



# Item Wise Sales Person Reserved QTY
@frappe.whitelist()
def sales_person_wise_reserved_qty_item(item_code,delivery_date):
    res_qty = []  
    sale_person_qty = frappe.db.sql(f"""select sum(qty) from `tabSales Order Item` where item_code = '{item_code}' AND delivery_date = '{delivery_date}' AND docstatus != '2' """)
    for sp_qty in sale_person_qty:
        res_qty.append(sp_qty)
    return res_qty



# Item Zero Not Show
@frappe.whitelist()
def item_zero_not_show(warehouse):
    zero_qty = []  
    itm_qty = frappe.db.sql("select item_code from `tabBin` where warehouse = %s AND actual_qty != '0'", warehouse)
    # itm_qty = frappe.db.sql(f"""select item_code from `tabBin` where warehouse = '{warehouse}' AND actual_qty != '0' """)
    for qty in itm_qty:
        zero_qty.append(qty[0])
    return zero_qty
    


@frappe.whitelist()
def make_delivery_note(source_name, target_doc=None, skip_item_mapping=False):
	from erpnext.stock.doctype.packed_item.packed_item import make_packing_list

	def set_missing_values(source, target):
		target.run_method("set_missing_values")
		target.run_method("set_po_nos")
		target.run_method("calculate_taxes_and_totals")

		if source.company_address:
			target.update({"company_address": source.company_address})
		else:
			# set company address
			target.update(get_company_address_details(target.company))

		if target.company_address:
			target.update(get_fetch_values("Delivery Note", "company_address", target.company_address))

		make_packing_list(target)

	def update_item(source, target, source_parent):
		target.base_amount = (flt(source.qty) - flt(source.delivered_qty)) * flt(source.base_rate)
		target.amount = (flt(source.qty) - flt(source.delivered_qty)) * flt(source.rate)
		target.qty = flt(source.qty) - flt(source.delivered_qty)

		item = get_item_defaults(target.item_code, source_parent.company)
		item_group = get_item_group_defaults(target.item_code, source_parent.company)

		if item:
			target.cost_center = (
				frappe.db.get_value("Project", source_parent.project, "cost_center")
				or item.get("buying_cost_center")
				or item_group.get("buying_cost_center")
			)

	mapper = {
		"Sales Order": {"doctype": "Delivery Note", "validation": {"docstatus": ["=", 0]}},
		"Sales Taxes and Charges": {"doctype": "Sales Taxes and Charges", "add_if_empty": True},
		"Sales Team": {"doctype": "Sales Team", "add_if_empty": True},
	}

	if not skip_item_mapping:

		def condition(doc):
			# make_mapped_doc sets js `args` into `frappe.flags.args`
			if frappe.flags.args and frappe.flags.args.delivery_dates:
				if cstr(doc.delivery_date) not in frappe.flags.args.delivery_dates:
					return False
			return abs(doc.delivered_qty) < abs(doc.qty) and doc.delivered_by_supplier != 1

		mapper["Sales Order Item"] = {
			"doctype": "Delivery Note Item",
			"field_map": {
				"rate": "rate",
				"name": "so_detail",
				"parent": "against_sales_order",
			},
			"postprocess": update_item,
			"condition": condition,
		}

	target_doc = get_mapped_doc("Sales Order", source_name, mapper, target_doc, set_missing_values)

	return target_doc
