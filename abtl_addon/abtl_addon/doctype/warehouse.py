# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import json
import frappe

# Branch Wise Store Filter
@frappe.whitelist()
def branch_wise_store_filter(branch):
    store = []  
    warehouse = frappe.db.sql("select name from `tabWarehouse` where custom_branch = %s AND disabled = 0 AND is_group = 0", branch)
    for str in warehouse:
        store.append(str[0])
    return store



# Store Wise Defualt Payment Mode
@frappe.whitelist()
def default_set_payment_mode(customer):
    defualt = []  
    is_def_payment = frappe.db.sql("select mode_of_payment from `tabCustomer Wise Payment Item` where parent = %s AND is_default = 1", customer)
    for pay in is_def_payment:
        defualt.append(pay[0])
    return defualt