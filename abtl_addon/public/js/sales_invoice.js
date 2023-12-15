// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt


frappe.ui.form.on('Sales Invoice', {
	//Mode Of Payment Button
    refresh: function(frm) {
        if(!frm.is_new() && cur_frm.doc.status !== "Paid"){
            
            //Cash Payment
            frm.add_custom_button(__('Cash Payment'), function(){
                cur_frm.set_value("custom_payment_type","Cash")
                frm.save('Update');
                frappe.call({
                method:"abtl_addon.abtl_addon.doctype.sales_invoice.cash_payment_action",
                args:{
                    doc:cur_frm.doc,
                },
                callback:function(r){
                    console.log("*************** Payment Entry Created - Cash *******************")
                }
                });
            }, __("Mode Of Payment")).css({ 'background-color': '#10a139', 'color': 'white' });

            // Visa Payemnt           
            frm.add_custom_button(__('Visa Payment'), function(){
                cur_frm.set_value("custom_payment_type","Credit Card")
                frm.save('Update');
                frappe.prompt([
                    {
                        label: 'Cheque/Reference No',
                        fieldname: 'reference_no',
                        fieldtype: 'Data'
                    },
                    {
                        label: 'Cheque/Reference Date',
                        fieldname: 'reference_date',
                        fieldtype: 'Date'
                    },
                ], (values) => {
                    frappe.call({
                    method:"abtl_addon.abtl_addon.doctype.sales_invoice.visa_payment_action",
                    args:{
                        doc:cur_frm.doc,
                        reference_no : values.reference_no,
                        reference_date : values.reference_date
                    },
                    callback:function(r){
                        console.log("*************** Payment Entry Created - Visa *******************")
                    }
                    });
                });
            }, __("Mode Of Payment")).css({ 'background-color': '#ebb434', 'color': 'white' });

            //Both Payment
            frm.add_custom_button(__('Both Payment'), function(){
                cur_frm.set_value("custom_payment_type","Both")
                frm.save('Update');
                const dialog = frappe.prompt({
                    fieldnmae:'both_payment',
                    fieldtype:'Table',
                    label:(__("Payment Entry")),
                    fields:[
                         {
                            fieldname:'payment_type',
                            fieldtype:'Select',
                            options:['Cash','Visa'],
                            label: __('Payment Type'),
                            in_list_view:1
                            
                        },
                        {
                            label: 'Cheque/Reference No',
                            fieldname: 'reference_no',
                            fieldtype: 'Data',
                            in_list_view:1
                            
                        },
                        {
                            label: 'Cheque/Reference Date',
                            fieldname: 'reference_date',
                            fieldtype: 'Date',
                            in_list_view:1
                            
                        },
                        {
                            fieldname:'amount',
                            fieldtype:'Currency',
                            label: __('Amount'),
                            in_list_view:1
                            
                        },
                    ],
                    },function(r){
                        $.each(r,function(i,j){
                            var total = 0;
                            j.forEach(function(d) {
                                total += d.amount;
                            });
                            if(cur_frm.doc.outstanding_amount >= total){
                                $.each(j,function(i1,j1){
                                
                                    //Cash
                                    let row_cash = [];
                                    row_cash.push({       
                                        "reference_doctype":"Sales Invoice",
                                        "reference_name":cur_frm.doc.name,
                                        "allocated_amount":j1.amount,
                                    });
    
                                    //Visa
                                    let row_visa = [];
                                    row_visa.push({       
                                        "reference_doctype":"Sales Invoice",
                                        "reference_name":cur_frm.doc.name,
                                        "allocated_amount":j1.amount,
                                    });
    
                                    if(j1.payment_type == "Cash"){
                                        frappe.db.insert({
                                            "doctype":"Payment Entry",
                                            "payment_type" : "Receive",
                                            "mode_of_payment":"Cash",
                                            "company" : cur_frm.doc.company,
                                            "cost_center" : cur_frm.doc.cost_center,
                                            "posting_date" : cur_frm.doc.posting_date,
                                            "party_type" : "Customer",
                                            "party" : cur_frm.doc.customer,
                                            "paid_to" : "1110 - Cash - A",
                                            "paid_amount" : j1.amount,
                                            "received_amount" : j1.amount,
                                            "reference_no" : j1.reference_no,
                                            "reference_date" : j1.reference_date,
                                            "references":row_cash
                                        }).then(function(doc){
                                            frappe.msgprint("Cash Payment Entry Created!")
                                        })
                                    }
                                    else{
                                        frappe.db.insert({
                                            "doctype":"Payment Entry",
                                            "payment_type" : "Receive",
                                            "mode_of_payment":"Credit Card",
                                            "company" : cur_frm.doc.company,
                                            "cost_center" : cur_frm.doc.cost_center,
                                            "posting_date" : cur_frm.doc.posting_date,
                                            "party_type" : "Customer",
                                            "party" : cur_frm.doc.customer,
                                            "paid_to" : "1201 - Bank Muscat - A",
                                            "paid_amount" : j1.amount,
                                            "received_amount" : j1.amount,
                                            "reference_no" : j1.reference_no,
                                            "reference_date" : j1.reference_date,
                                            "references":row_visa
                                        }).then(function(doc){
                                            frappe.msgprint("Visa Payment Entry Created!")
                                        })
                                    }
                                })   
                            }
                            else{
                                frappe.throw("Sales Invoice Amount Not Equal To Mode Of Payment Amount")
                            }
                                                     
                        })
            });
            }, __("Mode Of Payment")).css({ 'background-color': '#d12613', 'color': 'white' });
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

