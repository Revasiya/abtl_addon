// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Entry', {
	refresh(frm) {
		frm.set_df_property('get_outstanding_invoices','hidden',1);
		frm.set_df_property('get_outstanding_orders','hidden',1);
	},
	onload(frm) {
		frm.set_df_property('get_outstanding_invoices','hidden',1);
		frm.set_df_property('get_outstanding_orders','hidden',1);
	},
    setup(frm) {
		frm.set_df_property('get_outstanding_invoices','hidden',1);
		frm.set_df_property('get_outstanding_orders','hidden',1);
	},
	custom_fetch_outstanding_invoices: function(frm) {
		frm.events.get_outstanding_documents(frm, true, false);
	}
});

frappe.ui.form.on('Payment Entry Reference', {
    reference_name:function(frm,cdt,cdn) {
	    var d = locals[cdt][cdn];
	    if(d.reference_doctype == "Journal Entry"){
	        frappe.db.get_list('Journal Entry',{ 
                fields:['user_remark'], 
                filters:{ 
                    'name':d.reference_name
                } 
            }).then(function(doc){ 
                console.log(doc); 
                frappe.model.set_value(d.doctype, d.name, "custom_remark", doc[0].user_remark);
            });
	    }
	    else{
	        frappe.model.set_value(d.doctype, d.name, "custom_remark", "");
	    }
	}
});