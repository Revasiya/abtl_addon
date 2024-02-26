# Copyright (c) 2024, envisionx Oman and contributors
# For license information, please see license.txt

# Copyright (c) 2022, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)

	return columns, data
def get_columns(filters):
	return[
		"Item Code:Data:120",
		"Item Name:Data:80",
		"Warehouse:Date:100",

	]
def get_data(filters):
	cond = ""
	if filters.get("warehouse"):
		cond = "and warehouse='{0}' ".format(filters.get("warehouse"))
	
	
	records = frappe.db.sql(""" 
		SELECT item_code,warehouse,actual_qty,valuation_rate FROM `tabBin`
 		""".format(cond), as_dict=1)

	data = []
	prev_dep  = None 
	for item in records:
		row = None
		if prev_dep != item[0]:
			prev_dep = item[0]
			row=[item[0],"","","",]
			data.append(row)
			row=[""]
		else:
			row=[""]
		row.append(item[1])
		row.append(item[2])
		row.append(frappe.db.get_value("Item",{"name":item[1]},"item_name")),
		row.append(item[3])
		
		data.append(row)
	return data
		
