// Copyright (c) 2024, envisionx Oman and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Muscat Store Available Stock"] = {
	"filters": [{
		"fieldname": "warehouse",
		"label": __("Warehouse"),
		"fieldtype": "Select",
		"options":['1-Muscat Store 1 - A','2-Muscat Store 2 - A'],
		"default": '1-Muscat Store 1 - A'
	},

	]
};
