// Copyright (c) 2024, envisionx Oman and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Warehouse Wise Stock Report"] = {
	"filters": [
		{
			"fieldname":"item_code",
			"label":("Item"), // Displayed label for the filter
			"fieldtype":"Link", // Type of the field (Link field, in this case)
			"options":"Item", // Options for the Link field (referencing the "Item" doctype)
		},
	]
};

