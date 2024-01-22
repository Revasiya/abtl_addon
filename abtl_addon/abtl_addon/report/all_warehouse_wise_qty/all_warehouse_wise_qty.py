# Copyright (c) 2024, envisionx Oman and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate, cstr, flt, fmt_money

def execute(filters=None):
	conditions,filters = get_conditions(filters)
	columns = get_columns(filters)
	data = get_data(conditions,filters)

	return columns,data

def get_data(conditions,filters):
        
		# SELECT item_code,warehouse,actual_qty,valuation_rate FROM `tabBin` Where warehouse = %(warehouse)s
		all_wh = frappe.db.sql(""" 
		SELECT item_code,actual_qty FROM `tabBin` Where item_code = %(item_code)s
						 
		
		{conditions}
 		""".format(conditions=conditions), filters, as_dict=1)
		return all_wh
		
  
def get_conditions(filters):
	conditions = ""
	if filters.get("item_code"): conditions += " and item_code = %(item_code)s"
	return conditions,filters   
   
def get_columns(filters):

	return  [
		
		{
			"label": ("Item Code"),
			"fieldname": "item_code",
			"fieldtype": "Link",
			"options": "Item",
			"width": 260
		},

			
		{
			"label": ("Actual Qty"),
			"fieldname": "actual_qty",
			"fieldtype": "Data",
			"width": 200
		},

		
		
        
        ]