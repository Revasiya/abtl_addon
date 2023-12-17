# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import json
import frappe


def after_insert(doc,method):
    if doc.name and doc.store:
        user_per = frappe.get_doc({
        "doctype": "User Permission",
        "user":doc.name,
        "allow":"Warehouse",
        "for_value":"10001-Muscat Stor 1 - A",
        })
        user_per.insert()


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