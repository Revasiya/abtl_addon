// Copyright (c) 2024, envisionx Oman and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Avenues Mall Available Stock"] = {
	"filters": [{
		"fieldname": "warehouse",
		"label": __("Warehouse"),
		"fieldtype": "Select",
		"options":['13-Avenues Mall - A','1-Muscat Store 1 - A','2-Muscat Store 2 - A'],
		"default": '13-Avenues Mall - A'
	},
	]
};
