// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

//Item Qty Zero Not Show In Item Table
// frappe.ui.form.on('Sales Order', {
// 	set_warehouse: function(frm) {
// 	    if(cur_frm.doc.set_warehouse){
// 	        frappe.call({
//                 method:"abtl_addon.abtl_addon.doctype.sales_order.item_zero_not_show",
//                 args:{
//                     warehouse:frm.doc.set_warehouse,
//                 },
//                 callback:function(r){
//                     console.log(r);
//                     cur_frm.clear_table("items");
//                     if (r.message) {
//                       cur_frm.set_query("item_code", "items", function(doc, cdt, cdn) {
//                         var d = locals[cdt][cdn];
//                         return{
//                             filters: [
//                                 ['name', 'in' , r.message]
//                             ]
//                         };
//                         }); 
//                     }
//                 }
               
//             });
// 	    }    
// 	}
// });

//Rate Not Less Def Rate
frappe.ui.form.on("Sales Order Item",{
    rate:function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        frappe.db.get_list('Item Price',{ 
        fields:['price_list_rate'], 
        filters:{ 
            'item_code':d.item_code,
            'selling':1,
            'price_list':cur_frm.doc.selling_price_list,
        } 
        }).then(function(doc){ 
            if(doc[0].price_list_rate >= d.rate){
                frappe.model.set_value(cdt, cdn, 'rate', doc[0].price_list_rate);
                frappe.model.set_value(cdt, cdn, 'amount', doc[0].price_list_rate*d.qty);
            }
            else{
                frappe.model.set_value(cdt, cdn, 'amount', d.rate*d.qty);
            }
        });
    }
});

frappe.ui.form.on('Sales Order', {
    setup(frm) {
        frm.set_df_property('custom_payment_type',  'hidden',1);
	    frm.set_df_property('custom_sales_person',  'read_only',1);
		if(frm.is_new()){
		    frappe.db.get_list('User',{ 
            fields:['sales_person','branch','store'], 
            filters:{ 
                'name':frappe.session.user_email
            } 
            }).then(function(doc){
                console.log(doc) 
                cur_frm.set_value("custom_sales_person",doc[0].sales_person);
                cur_frm.set_value("custom_branch",doc[0].branch);
                cur_frm.set_value("set_warehouse",doc[0].store);
            });
		}
	},
    // refresh: function(frm){
    //     if(cur_frm.doc.set_warehouse){
    //         if(!cur_frm.custom_payment_type){
    //             frm.set_df_property('custom_payment_type',  'reqd',1);    
    //         }
    //         else{
    //             frm.set_df_property('custom_payment_type',  'reqd',0); 
    //         }
            
    //     }
    // },
	custom_branch: function(frm) {
	    cur_frm.set_value("set_warehouse","");
		frappe.call({
            method:"abtl_addon.abtl_addon.doctype.sales_order.branch_wise_store_filter",
            args:{
                branch:frm.doc.custom_branch,
            },
            callback:function(r){
                console.log(r);
                if (r.message) {
                    cur_frm.set_query("set_warehouse", function(doc) {
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
	// set_warehouse: function(frm) {
	//     cur_frm.set_value("custom_payment_type","");
	//     if(cur_frm.doc.set_warehouse){
	//         frm.set_df_property('custom_payment_type',  'reqd',1);
	//     }
	// 	frappe.call({
    //         method:"abtl_addon.abtl_addon.doctype.sales_order.mode_of_payment_filter",
    //         args:{
    //             store:frm.doc.set_warehouse,
    //         },
    //         callback:function(r){
    //             console.log(r);
    //             if (r.message) {
    //                 cur_frm.set_query("custom_payment_type", function(doc) {
    //                     return{
    //                         filters: [
    //                             ['Mode of Payment', 'name', 'in' , r.message]
    //                         ]
    //                     };
    //                 });        
    //             }
    //         }
    //     });
	// },
	// custom_payment_type: function(frm) {
	//     if(!cur_frm.doc.custom_payment_type && cur_frm.doc.set_warehouse){
	//         frm.set_df_property('custom_payment_type',  'reqd',1);
	//         frappe.call({
    //             method:"abtl_addon.abtl_addon.doctype.sales_order.mode_of_payment_filter",
    //             args:{
    //                 store:frm.doc.set_warehouse,
    //             },
    //             callback:function(r){
    //                 console.log(r);
    //                 if (r.message) {
    //                     cur_frm.set_query("custom_payment_type", function(doc) {
    //                         return{
    //                             filters: [
    //                                 ['Mode of Payment', 'name', 'in' , r.message]
    //                             ]
    //                         };
    //                     });    
    //                 }
    //             }
    //         });
	//     }
	// },
});


frappe.ui.form.on("Sales Order","onload", function(frm, cdt, cdn) { 
    frm.fields_dict.items.grid.update_docfield_property("custom_reserved_qty", "read_only", 1);

});

frappe.ui.form.on('Sales Order Item', {
	item_code(frm,cdt,cdn) {
	    var d = locals[cdt][cdn];
	    frappe.call({
            method:"abtl_addon.abtl_addon.doctype.sales_order.sales_person_wise_reserved_qty_item",
            args:{
                item_code:d.item_code,
                delivery_date:cur_frm.doc.transaction_date
            },
            callback:function(r){
                // console.log(r);
                $.each(r.message, function(_i, e){
                    // console.log(e);
                    frappe.model.set_value(d.doctype, d.name, "custom_reserved_qty", e[0]);
                });
            }
        });
	}
});