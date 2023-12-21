# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import json
import frappe


def validate(doc,method):
    if doc.workflow_state == "Approved":
        dn = frappe.get_doc({
            "doctype": "Delivery Note",
            "customer": doc.customer,
            "posting_date":doc.transaction_date,
            "company":doc.company,
            "cost_center":doc.cost_center,
            "currency":doc.currency,
            "conversion_rate":doc.conversion_rate,
            "selling_price_list":doc.selling_price_list,
            "price_list_currency":doc.price_list_currency,
            "plc_conversion_rate":doc.plc_conversion_rate,
            "ignore_pricing_rule":doc.ignore_pricing_rule,
            "set_warehouse":doc.set_warehouse,
            "total_qty":doc.total_qty,
            "base_total":doc.base_total,
            "base_net_total":doc.base_net_total,
            "total":doc.total,
            "net_total":doc.net_total,
            "tax_category":doc.tax_category,
            "taxes_and_charges":doc.taxes_and_charges,
            "shipping_rule":doc.shipping_rule,
            "base_total_taxes_and_charges":doc.base_total_taxes_and_charges,
            "total_taxes_and_charges":doc.total_taxes_and_charges,
            "grand_total":doc.grand_total,
            "rounding_adjustment":doc.rounding_adjustment,
            "rounded_total":doc.rounded_total,
            "in_words":doc.in_words,
            "advance_paid":doc.advance_paid,
            "disable_rounded_total":doc.disable_rounded_total,
            "apply_discount_on":doc.apply_discount_on,
            "additional_discount_percentage":doc.additional_discount_percentage,
            "discount_amount":doc.discount_amount,
            "other_charges_calculation":doc.other_charges_calculation,
            "customer_address":doc.customer_address,
            "address_display":doc.address_display,
            "customer_group":doc.customer_group,
            "territory":doc.territory,
            "contact_person":doc.contact_person,
            "contact_display":doc.contact_display,
            "contact_phone":doc.contact_phone,
            "contact_mobile":doc.contact_mobile,
            "contact_email":doc.contact_email,
            "shipping_address_name":doc.shipping_address_name,
            "shipping_address":doc.shipping_address,
            "dispatch_address_name":doc.dispatch_address_name,
            "dispatch_address":doc.dispatch_address,
            "company_address":doc.company_address,
            "company_address_display":doc.company_address_display,
            "custom_branch":doc.custom_branch
        })
        # Item
        for i in doc.items:
            dn.append("items",{
                'item_code':i.item_code,
                'item_name':i.item_name,
                'description':i.description,
                'item_group':i.item_group,
                'brand':i.brand,
                'qty':i.qty,
                'stock_uom':i.stock_uom,
                'uom':i.uom,
                'conversion_factor':i.conversion_factor,
                'stock_qty':i.stock_qty,
                'price_list_rate':i.price_list_rate,
                'base_price_list_rate':i.base_price_list_rate,
                'rate':i.rate,
                'amount':i.amount,
                'pricing_rules':i.pricing_rules,
                'stock_uom_rate':i.stock_uom_rate,
                'is_free_item':i.is_free_item,
                'grant_commission':i.grant_commission,
                'net_rate':i.net_rate,
                'net_amount':i.net_amount,
                'billed_amt':i.billed_amt,
                'target_warehouse':i.target_warehouse,
                'rate':i.rate,
                'amount':i.amount,
                'against_sales_order':doc.name,
                'actual_qty':i.actual_qty,
            })
        # Tax
        for t in doc.taxes:
            dn.append("taxes",{
                'charge_type':t.charge_type,
                'account_head':t.account_head,
                'description':t.description,
                'included_in_print_rate':t.included_in_print_rate,
                'included_in_paid_amount':t.included_in_paid_amount,
                'cost_center':t.cost_center,
                'rate':t.rate,
                'account_currency':t.account_currency,
                'tax_amount':t.tax_amount,
                'total':t.total,
                'tax_amount_after_discount_amount':t.tax_amount_after_discount_amount,
                'base_tax_amount':t.base_tax_amount,
                'base_total':t.base_total,
                'base_tax_amount_after_discount_amount':t.base_tax_amount_after_discount_amount,
                'item_wise_tax_detail':t.item_wise_tax_detail,
                'dont_recompute_tax':t.dont_recompute_tax
            })    
        dn.insert()

        # Fetch Latest Delivery Note
        dn_it = frappe.get_list("Delivery Note Item",filters={'against_sales_order': doc.name},fields=['parent'],page_length=1)
        for dn_no in dn_it:
            frappe.msgprint("Create New Delivery Note Successfully " +':- '+ frappe.bold(dn_no.parent))
        

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
    