# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
import re


# Serial No Wise Qty
@frappe.whitelist()
def serial_no_qty_count(serial_no):
    serial_no_count = serial_no.count('\n')
    qty = serial_no_count + 1
    return qty

# Serial No Space Remove and Count Qty
@frappe.whitelist()
def serial_no_space(serial_no):
    s = serial_no.replace (" ", ",")
    serial_no_count = s.count(',')
    qty = serial_no_count + 1
    return s,qty

# Serial No Add comm and Count Qty
@frappe.whitelist()
def serial_no_add_comm(serial_no):
    s = serial_no
    pattern = r"(?m)(?<=\d)\d{15}(?=(?:\d{15})*$)"
    patt_15 = re.sub(pattern, r",\g<0>", s)

    # Count Qty
    serial_no_count = serial_no.count('\n')
    qty = serial_no_count + 1
    return patt_15,qty
            




# Serial No Pace Remove and Count Qty
# @frappe.whitelist()
# def serial_no_space(serial_no):
#     if serial_no.find(' ') != -1:
#         s = serial_no.replace (" ", ",")
#         return s
#     else:
#         if serial_no.find(' ') != -1:
#             serial_no_count = serial_no.count('\n')
#             qty = serial_no_count + 1
#             return qty
#         else:
#             serial_no_count = serial_no.count('\n')
#             qty = serial_no_count + 1
#             return qty