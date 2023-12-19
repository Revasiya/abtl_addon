# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe

def after_insert(doc,method):
    item_price_list = frappe.get_doc({
    "doctype": "Item Price List History",
    "item_code":doc.item_code,
    "item_price_list":doc.price_list,
    "item_rate":doc.price_list_rate
    # "date":frappe.utils.now()
	})
    item_price_list.insert()