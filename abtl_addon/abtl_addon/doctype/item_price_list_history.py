# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe

def after_insert(doc,method):
    check_item = frappe.db.get_value("Item Price", {'item_code':doc.item_code,'price_list':doc.item_price_list,'selling':1}, 'name')

    # Update Price List
    frappe.db.set_value('Item Price', check_item, {
        'price_list_rate': doc.item_rate
    })

    #Insert Item Price History In Item Master

    check_item_price_history = frappe.db.get_value("Item Price History", {'item_code':doc.item_code,'old_price':doc.item_rate,'price_list':doc.item_price_list,'date':doc.date}, 'name')
    if check_item_price_history:
        frappe.get_print("Add There Item Price History")
    else:
        item_history = frappe.get_doc('Item',doc.item_code)
        add_on_entry_child = item_history.append('custom_item_price_history',{})
        add_on_entry_child.item_code = doc.item_code
        add_on_entry_child.old_price = doc.item_rate
        add_on_entry_child.price_list = doc.item_price_list
        add_on_entry_child.date = doc.date
        item_history.save()