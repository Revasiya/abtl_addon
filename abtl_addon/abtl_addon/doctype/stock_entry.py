# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import json
import frappe

def on_submit(doc,method):
    if doc.custom_good_transfer_no:
        # Set Good Transfer
        good_transfer_reference_number, good_received_reference_number = frappe.db.get_value('Good Transfer', doc.custom_good_transfer_no, ['good_transfer_reference_number', 'good_received_reference_number'])
        if not good_transfer_reference_number:
            frappe.db.set_value('Good Transfer', doc.custom_good_transfer_no, {
                'good_transfer_reference_number': doc.name
            })

        if not good_received_reference_number:
            frappe.db.set_value('Good Transfer', doc.custom_good_transfer_no, {
                'good_received_reference_number': doc.name
            })


        # if not gtrn:
        #     frappe.db.set_value('Good Transfer', doc.custom_good_transfer_no, {
        #         'good_transfer_reference_number': doc.name
        #     })

        # # Set Good Received Reff
        # grrn = frappe.db.get_value('Good Transfer', doc.custom_good_transfer_no, 'good_received_reference_number')
        # if not grrn:
        #     frappe.db.set_value('Good Transfer', doc.custom_good_transfer_no, {
        #         'good_received_reference_number': doc.name
        #     })
            

                    # name = doc.name
            # custom_good_transfer_no = doc.custom_good_transfer_no
            # frappe.db.sql(f"""UPDATE `tabGood Transfer` SET good_transfer_reference_number='{name}' WHERE name='{custom_good_transfer_no}' """, as_dict=True)
            # frappe.db.commit()
            