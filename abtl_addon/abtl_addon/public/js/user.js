// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('User', {
	onload(frm) {
	    if(cur_frm.doc.branch){
	        frm.set_df_property('store',  'hidden',0);
	        frappe.call({
            method:"abtl_addon.abtl_addon.doctype.user.branch_wise_store_filter",
            args:{
                branch:frm.doc.branch,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("store", function(doc) {
                        return{
                            filters: [
                                ['Warehouse', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
	    }
	    else if(cur_frm.doc.store){
	        frm.set_df_property('sales_person',  'hidden',0);
	    }
	    else{
	        frm.set_df_property('store',  'hidden',1);
	        frm.set_df_property('sales_person',  'hidden',1);
	    }
	    
	},
	branch(frm) {
	    frm.set_df_property('store',  'hidden',0);
	    cur_frm.set_value("store","");
		frappe.call({
            method:"abtl_addon.abtl_addon.doctype.user.branch_wise_store_filter",
            args:{
                branch:frm.doc.branch,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("store", function(doc) {
                        return{
                            filters: [
                                ['Warehouse', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
	    
	},
});