# Copyright (c) 2024, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today

class SalesReturnEntry(Document):
	# pass
	def on_submit(self):
		stock_entry = frappe.get_doc({
			"doctype": "Stock Entry",
			"stock_entry_type": "Material Receipt",
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

		#Journal Entry For Customer Account Add
		jv_entry = frappe.get_doc({
			"doctype": "Journal Entry",
			"voucher_type":"Credit Note",
			"company": self.company,
			"posting_date": today()
		})
		# Account
		jv_entry.append("accounts", {
			"account": self.debtors_account,
			'party_type': "Customer",
			'party': self.customer,
			"debit_in_account_currency": 0.00,
			"debit": 0.00,
			"credit_in_account_currency": abs(self.net_total_amount),
			"credit": abs(self.net_total_amount)
		})

		jv_entry.append("accounts", {
			"account": self.vat,
			"debit_in_account_currency": 0.00,
			"debit": 0.00,
			"credit_in_account_currency": abs(self.total_tax_amount),
			"credit": abs(self.total_tax_amount)
		})

		jv_entry.append("accounts", {
			"account": self.cash_account,
			"debit_in_account_currency": abs(self.total_amount),
			"debit": abs(self.total_amount),
			"credit_in_account_currency": 0.00,
			"credit": 0.00
		})

		jv_entry.insert()
		jv_entry.submit()
		# frappe.msgprint("Sales Return Created Succesfull")
			

