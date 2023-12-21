# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GoodTransfer(Document):
	# pass

	def validate(self):
		# Stock Transfer In Main  - Transit Warehouse
		if self.status == "Goods In Transit":
			stock_entry = frappe.get_doc({
				"doctype": "Stock Entry",
				"custom_good_transfer_no":self.name,
				"stock_entry_type": "Material Transfer",
				"from_warehouse":self.source_warehouse,
				"to_warehouse":"9999-Goods In Transit - A",
			})
			# Item
			for i in self.items:
				if i.imei_no:
					stock_entry.append("items",{
						'item_code':i.item_code,
						'item_name':i.item_name,
						'description':i.description,
						'qty':i.qty,
						'uom':i.stock_uom,
					})  
				else:
					frappe.msgprint("Please Set IMEI No")
			stock_entry.insert()
			stock_entry.submit()
			frappe.msgprint("Stock Entry Transfer Created Succesfull")
			

		# Stock Recevied In Store
		if self.status == "Goods Received":
			stock_entry_receiv = frappe.get_doc({
				"doctype": "Stock Entry",
				"custom_good_transfer_no":self.name,
				"stock_entry_type": "Material Transfer",
				"from_warehouse":"9999-Goods In Transit - A",
				"to_warehouse":self.target_warehouse,
			})
			# Item
			for i in self.items:
				stock_entry_receiv.append("items",{
					'item_code':i.item_code,
					'item_name':i.item_name,
					'description':i.description,
					'qty':i.qty,
					'uom':i.stock_uom,
				})  
			stock_entry_receiv.insert()
			stock_entry_receiv.submit()
			frappe.msgprint("Goods Received Succesfull")
		

# Item Zero Not Show
@frappe.whitelist()
def item_zero_not_show(warehouse):
    zero_qty = []  
    itm_qty = frappe.db.sql("select item_code from `tabBin` where warehouse = %s AND actual_qty != '0'", warehouse)
    # itm_qty = frappe.db.sql(f"""select item_code from `tabBin` where warehouse = '{warehouse}' AND actual_qty != '0' """)
    for qty in itm_qty:
        zero_qty.append(qty[0])
    return zero_qty



# Actual Qty Show
@frappe.whitelist(allow_guest=True)
def actual_qty_show(item_code,warehouse):
	actual_qty = frappe.db.get_list('Bin',{'item_code':item_code, 'warehouse':warehouse}, 'actual_qty')
	return actual_qty

				
