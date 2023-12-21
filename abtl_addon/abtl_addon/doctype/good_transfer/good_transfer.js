// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on("Good Transfer","onload", function(frm, cdt, cdn) { 
    if(frm.is_new()){
        var df1 = frappe.meta.get_docfield("Good Transfer Item","imei_no", cur_frm.doc.name);
        df1.reqd = 0;
    }
    else{
        var df = frappe.meta.get_docfield("Good Transfer Item","imei_no", cur_frm.doc.name);
        df.reqd = 1;
    }
});


frappe.ui.form.on('Good Transfer', {
	onload: function(frm) {
	    if(cur_frm.doc.source_warehouse){
	        frappe.call({
                method:"abtl_addon.abtl_addon.doctype.good_transfer.good_transfer.item_zero_not_show",
                args:{
                    warehouse:frm.doc.source_warehouse,
                },
                callback:function(r){
                    if (r.message) {
                      cur_frm.set_query("item_code", "items", function(doc, cdt, cdn) {
                        var d = locals[cdt][cdn];
                        return{
                            filters: [
                                ['name', 'in' , r.message]
                            ]
                        };
                        }); 
                    }
                }
            });
	    }    
	},
	source_warehouse: function(frm) {
	    if(cur_frm.doc.source_warehouse){
	        frappe.call({
                method:"abtl_addon.abtl_addon.doctype.good_transfer.good_transfer.item_zero_not_show",
                args:{
                    warehouse:frm.doc.source_warehouse,
                },
                callback:function(r){
                    // console.log(r);
                    if (r.message) {
                      cur_frm.set_query("item_code", "items", function(doc, cdt, cdn) {
                        var d = locals[cdt][cdn];
                        return{
                            filters: [
                                ['name', 'in' , r.message]
                            ]
                        };
                        }); 
                    }
                }
               
            });
	    }    
	},
	target_warehouse(frm) {
	    if(cur_frm.doc.source_warehouse === cur_frm.doc.target_warehouse){
	        frappe.throw("Source Warehouse and Target Warehouse are Same Please Select Other Warehouse!");
	    }
	}
});

