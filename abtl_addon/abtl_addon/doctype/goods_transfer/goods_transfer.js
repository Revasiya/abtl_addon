// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Goods Transfer","onload", function(frm, cdt, cdn) { 
//     if(frm.is_new()){
//         var df1 = frappe.meta.get_docfield("Goods Transfer Item","imei_no", cur_frm.doc.name);
//         df1.reqd = 0;
//     }
//     else{
//         var df = frappe.meta.get_docfield("Goods Transfer Item","imei_no", cur_frm.doc.name);
//         df.reqd = 1;
//     }
// });


frappe.ui.form.on('Goods Transfer', {
    setup: function(frm) {
        frm.set_query("source_warehouse", function() {
            return {
                filters: {
                    'is_group': 0,
                }
            };
        });
        
        frm.set_query("target_warehouse", function() {
            return {
                filters: {
                    'is_group': 0
                }
            };
        });
    },
	onload: function(frm) {
	    if(cur_frm.doc.source_warehouse){
	        frappe.call({
                method:"abtl_addon.abtl_addon.doctype.goods_transfer.goods_transfer.item_zero_not_show",
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
                method:"abtl_addon.abtl_addon.doctype.goods_transfer.goods_transfer.item_zero_not_show",
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


frappe.ui.form.on('Goods Transfer Item', {
	item_code:function(frm,cdt,cdn) {
	    var d = locals[cdt][cdn];
	    if(cur_frm.doc.source_warehouse){
    	    frappe.call({
            method:"abtl_addon.abtl_addon.doctype.goods_transfer.goods_transfer.actual_qty_show",
            args:{
                'item_code': d.item_code,
				'warehouse': cur_frm.doc.source_warehouse
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    var d = locals[cdt][cdn];
                    frappe.model.set_value(d.doctype, d.name, "actual_qty", r.message[0].actual_qty);
                }
            }
            });
	    }
	    else{
	        frappe.throw("Please Select Source Warehouse");
	    }
	},
	qty:function(frm,cdt,cdn) {
	    var d = locals[cdt][cdn];
	    if(d.actual_qty < d.qty){
	        frappe.throw("Please Enter Less Than Actual Qty!");
	    }
	},
// 	imei_no:function(frm,cdt,cdn) {
// 	    var d = locals[cdt][cdn];
// 	    varn = d.imei_no;
// 	    var ty = parseInt(n);
// 	    console.log(ty);
// 	}
});
