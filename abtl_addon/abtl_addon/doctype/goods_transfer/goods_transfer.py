# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GoodsTransfer(Document):
	# pass

	def on_submit(self):
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
				stock_entry.append("items",{
					'item_code':i.item_code,
					's_warehouse':self.source_warehouse,
					't_warehouse':'9999-Goods In Transit - A',
					'item_name':i.item_name,
					'description':i.description,
					'qty':i.qty,
					'uom':i.stock_uom,
					'serial_no':i.imei_no,
				})  
			stock_entry.insert()
			stock_entry.submit()
			frappe.msgprint("Stock Entry Transfer Created Succesfull")
			
	def on_change(self):
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
					's_warehouse':'9999-Goods In Transit - A',
					't_warehouse':self.target_warehouse,
					'item_name':i.item_name,
					'description':i.description,
					'qty':i.qty,
					'uom':i.stock_uom,
					'serial_no':i.imei_no,
				})  
			stock_entry_receiv.insert()
			stock_entry_receiv.submit()
			frappe.msgprint("Goods Received Succesfull")
		

# def on_change(doc,method):
# 	if doc.status == "Goods Received":
# 		stock_entry_receiv = frappe.get_doc({
# 				"doctype": "Stock Entry",
# 				"custom_goods_transfer_no":doc.name,
# 				"stock_entry_type": "Material Transfer",
# 				"from_warehouse":"9999-Goods In Transit - A",
# 				"to_warehouse":doc.target_warehouse,
# 		})
# 		# Item
# 		for i in doc.items:
# 			stock_entry_receiv.append("items",{
# 				'item_code':i.item_code,
# 				'item_name':i.item_name,
# 				'description':i.description,
# 				'qty':i.qty,
# 				'uom':i.stock_uom,
# 				'serial_no':i.imei_no,
# 			})  
# 		stock_entry_receiv.insert()
# 		# stock_entry_receiv.submit()
# 		frappe.msgprint("Goods Received Succesfull")


# Item Zero Not Show
@frappe.whitelist(allow_guest=True)
def item_zero_not_show(warehouse):
    zero_qty = []  
    itm_qty = frappe.db.sql("select item_code from `tabBin` where warehouse = %s AND actual_qty != '0'", warehouse)
    for qty in itm_qty:
        zero_qty.append(qty[0])
    return zero_qty



# Actual Qty Show
@frappe.whitelist(allow_guest=True)
def actual_qty_show(item_code,warehouse):
	actual_qty = frappe.db.get_list('Bin',{'item_code':item_code, 'warehouse':warehouse}, 'actual_qty')
	return actual_qty


# Serial No Wise Qty
@frappe.whitelist(allow_guest=True)
def serial_no_count(serial_no):
    serial_no_count = serial_no.count('\n')
    imei_count = serial_no_count + 1
    return imei_count
				
