// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Warehouse', {
	refresh: function(frm) {
		frm.set_df_property('warehouse_name','hidden', 1);
	}
});
