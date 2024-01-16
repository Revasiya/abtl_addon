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
		sohar = frappe.db.sql(""" 
		SELECT bin.item_code,it.item_name,bin.warehouse,bin.actual_qty,bin.valuation_rate FROM `tabBin` as bin
		LEFT JOIN `tabItem` as it ON 
		bin.item_code = it.name Where warehouse = %(warehouse)s
						 
		
		{conditions}
 		""".format(conditions=conditions), filters, as_dict=1)
		return sohar
		
  
def get_conditions(filters):
	conditions = ""
	if filters.get("warehouse"): conditions += " and warehouse = %(warehouse)s"
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
			"label": ("Item Name"),
			"fieldname": "item_name",
			"fieldtype": "Data",
			"width": 400
		},

		{
			"label": ("Warehouse"),
			"fieldname": "warehouse",
			"fieldtype": "Link",
			"options": "warehouse",
			"width": 200
		},
		{
			"label": ("Actual Qty"),
			"fieldname": "actual_qty",
			"fieldtype": "Float",
			"width": 150
		},
		{
			"label": ("Valuation Rate"),
			"fieldname": "valuation_rate",
			"fieldtype": "Float",
			"width": 180
		},
		
        
        ]