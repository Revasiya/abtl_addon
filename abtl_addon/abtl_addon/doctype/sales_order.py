# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe

@frappe.whitelist()
def branch_wise_store_filter(branch):
    store = []  
    warehouse = frappe.db.sql("select name from `tabWarehouse` where custom_branch = %s AND disabled = 0 AND is_group = 0", branch)
    for str in warehouse:
        store.append(str[0])
    return store