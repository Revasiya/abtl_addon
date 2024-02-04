# Copyright (c) 2024, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class PettyCash(Document):
	def on_submit(self):
		je = frappe.new_doc("Journal Entry")
		for i in self.accounting:
			je.append("accounts", {
				'account': i.account,
				'bank_account': i.bank_account,
				'party_type': i.party_type,
				'party': i.party,
				'cost_center': i.cost_center,
				'project':i.project,
				'debit_in_account_currency' : i.debit_in_account_currency,
				'credit_in_account_currency':i.credit_in_account_currency,
				'user_remark': i.user_remark
			})
		je.posting_date = self.posting_date
		je.mode_of_payment = self.mode_of_payment
		je.user_remark = self.remarks
		je.company = self.company
		je.multi_currency = 1
		je.ignore_permissions = True
		je.insert()
		je.submit()