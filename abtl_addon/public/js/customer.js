// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	refresh: function(frm) {
		frm.set_df_property('custom_customer_group_number','hidden', 1);
	},
    customer_group: function(frm) {
		if(!cur_frm.doc.custom_customer_group_number){
		   frappe.show_alert({
                message:__('Customer Group Number Not Set In Customer Group Doctype'),
                indicator:'red'
            }, 7);
		}
		
	},
	before_save: function(frm) {
		if(!cur_frm.doc.custom_customer_group_number){
		   frappe.show_alert({
                message:__('Customer Group Number Not Set In Customer Group Doctype'),
                indicator:'red'
            }, 7);
		}
		
	}
});