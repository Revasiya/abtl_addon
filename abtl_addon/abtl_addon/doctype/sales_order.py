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



# Item Wise Sales Person Reserved QTY
# @frappe.whitelist()
# def sales_person_wise_reserved_qty(item_code):
#     res_qty = []  
#     sale_person_qty = frappe.db.sql("select item_code,owner,qty,delivery_date,parent,warehouse,delivered_qty,docstatus from `tabSales Order Item` where item_code = %s ", item_code)
#     for sp_qty in sale_person_qty:
#         res_qty.append(sp_qty)
#     return res_qty