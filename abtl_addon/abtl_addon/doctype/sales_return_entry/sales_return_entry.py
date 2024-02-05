# Copyright (c) 2024, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SalesReturnEntry(Document):
	# pass
	def on_submit(self):
		stock_entry = frappe.get_doc({
			"doctype": "Stock Entry",
			"stock_entry_type": "Material Receipt",
			"to_warehouse":self.warehouse,
			"company":self.company,
			"remark":self.remark,
		})
		# Item
		for i in self.items:
			stock_entry.append("items",{
				'item_code':i.item_code,
				'item_name':i.item_name,
				'description':i.description,
				"t_warehouse":i.s_warehouse,
				'qty':i.qty,
				'basic_rate':i.basic_rate,
				'uom':i.stock_uom
			})  

		stock_entry.insert()
		stock_entry.submit()
		frappe.msgprint("Sales Return Created Succesfull")
			

