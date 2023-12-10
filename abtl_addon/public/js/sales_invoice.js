// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt


frappe.ui.form.on('Sales Invoice', {
	//Mode Of Payment Button
    refresh: function(frm) {
        if(!frm.is_new()){
            
            //Cash Payment
            frm.add_custom_button(__('Cash Payment'), function(){
                frappe.call({
                method:"abtl_addon.abtl_addon.doctype.sales_invoice.cash_payment_action",
                args:{
                    doc:cur_frm.doc,
                },
                callback:function(r){
                    console.log("***************Payment Entry Created*******************")
                }
                });
            }, __("Mode Of Payment")).css({ 'background-color': '#10a139', 'color': 'white' });

            // Visa Payemnt
            frm.add_custom_button(__('Visa Payment'), function(){
                frappe.call({
                method:"abtl_addon.abtl_addon.doctype.sales_invoice.cash_payment_action",
                args:{
                    doc:cur_frm.doc,
                },
                callback:function(r){
                    console.log("***************Payment Entry Created*******************")
                }
                });
            }, __("Mode Of Payment")).css({ 'background-color': '#ed7a21', 'color': 'white' });
        }    
        
    },
    custom_branch: function(frm) {
         frappe.call({
             method:"abtl_addon.abtl_addon.doctype.sales_invoice.branch_wise_store_filter",
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
     set_warehouse: function(frm) {
         if(cur_frm.doc.set_warehouse){
             frm.set_df_property('custom_payment_type',  'reqd',1);
         }
         frappe.call({
             method:"abtl_addon.abtl_addon.doctype.sales_invoice.default_set_payment_mode",
             args:{
                 store:frm.doc.set_warehouse,
             },
             callback:function(r){
                 console.log(r.message[0]);
                 if(r.message[0]){
                     var payment_type = r.message[0];
                     cur_frm.set_value("custom_payment_type", payment_type);
                 }
                 else{
                     var set_warehouse="<b style='color:black;'>" +`${cur_frm.doc.set_warehouse}`+"</b>";
                     frappe.throw("Please Set Deafult Mode Of Payment In This Store " + "<b>"+`${set_warehouse}`+"</b>");
                 }  
             }
            
         });
     },
});

