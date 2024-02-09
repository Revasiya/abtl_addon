# Copyright (c) 2023, envisionx Oman and contributors
# For license information, please see license.txt

# import frappe
# def execute(filters=None):
# 	columns, data = [], []
# 	return columns, data

from itertools import groupby
import frappe
from frappe.utils import getdate, cstr, flt, fmt_money

def execute(filters=None):
	conditions,filters = get_conditions(filters)
	columns = get_columns(filters)
	data = get_data(conditions,filters)

	return columns,data

def get_data(conditions,filters):
		data = []
		row = {}
		cur_ware = ""
		conditions = {}

		ware = frappe.db.get_all("Bin", filters={}, fields=["item_code","warehouse","actual_qty"], group_by="item_code")
		for b in ware:
			if cur_ware != b["item_code"]:
				row = {
					"item_code": b["item_code"],
					"warehouse": b["warehouse"],
					"actual_qty": b["actual_qty"]
				}
				cur_ware = b["item_code"]
				data.append(row)
		return data

def get_conditions(filters):
	conditions = ""
	# if filters.get("time"): conditions += " and time >= %(from_date)s"
	# if filters.get("out_time"): conditions += " and time > %(to_date)s"
	
	return conditions,filters   
   
def get_columns(filters):

	return  [
		
		{
			"label": ("Item Code"),
			"fieldname": "item_code",
			"fieldtype": "Link",
			"options": "Item",
			"width": 200
		},
		{
			"label": ("Warehouse"),
			"fieldname": "warehouse",
			"fieldtype": "Data",
			"width": 200
		},
		{
			"label": ("Actual Qty"),
			"fieldname": "actual_qty",
			"fieldtype": "Data",
			"width": 200
		},

		
		
        
        ]

