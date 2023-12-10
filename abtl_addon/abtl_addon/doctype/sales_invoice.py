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
def default_set_payment_mode(store):
    defualt = []  
    is_def_payment = frappe.db.sql("select mode_of_payment from `tabStore Payment Item` where parent = %s AND is_default = 1", store)
    for pay in is_def_payment:
        defualt.append(pay[0])
    return defualt


# Mode Of Payments Filter
# @frappe.whitelist()
# def mode_of_payment_filter(store):
#     mode_payment = []  
#     payment = frappe.db.sql("select mode_of_payment from `tabStore Payment Item` where parent = %s", store)
#     for pay in payment:
#         mode_payment.append(pay[0])
#     return mode_payment


# Cash Payment Button
@frappe.whitelist()
def cash_payment_action(doc):
    doc = json.loads(doc)
    pe = frappe.get_doc({
        "doctype": "Payment Entry",
        "payment_type" : "Receive",
        "company" : doc.get("company"),
        "cost_center" : doc.get("cost_center"),
        "posting_date" : doc.get("posting_date"),
        "mode_of_payment" : "Cash",
        "party_type" : "Customer",
        "party" : doc.get("customer"),
        "paid_to" : "1110 - Cash - A",
        "paid_amount" : doc.get("rounded_total"),
        "received_amount" : doc.get("rounded_total"),
    })    
    pe.append("references",{
        "reference_doctype":"Sales Invoice",
        "reference_name":doc.get("name"),
        "allocated_amount":doc.get("rounded_total"),
    })   
    pe.insert()
    frappe.msgprint("Successfull Created Payment Entry")