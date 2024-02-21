# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe

# Item Group Wise Item Show and Enable Has Serial
@frappe.whitelist()
def has_serial_enable_item(item_group):
    itm = frappe.db.sql("select name from `tabItem` where item_group = %s AND disabled = 0", item_group)
    for itm_list in itm:
        frappe.db.set_value('Item',itm_list[0],
        {
            'has_serial_no':"1"
        })

# Item Group Wise Item Show and Enable Has Serial
@frappe.whitelist()
def has_serial_disable_item(item_group):
    itm = frappe.db.sql("select name from `tabItem` where item_group = %s AND disabled = 0", item_group)
    for itm_list in itm:
        frappe.db.set_value('Item',itm_list[0],
        {
            'has_serial_no':"0"
        })