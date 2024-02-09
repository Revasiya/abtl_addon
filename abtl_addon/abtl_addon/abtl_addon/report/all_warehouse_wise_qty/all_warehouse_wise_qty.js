// Copyright (c) 2024, envisionx Oman and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["All Warehouse Wise Qty"] = {
	"filters": [{
		"fieldname": "item_code",
		"label": __("Item Code"),
		"fieldtype": "Link",
		"options":'Item',
	},
	]
};
