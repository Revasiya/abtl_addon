// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Purchase Receipt', {
//     refresh: function(frm) {
//         msgprint("Demo sjv svhjsh")
//     }
// });

frappe.ui.form.on('Delivery Note Item', {
    serial_no: function(frm,cdt,cdn) {

        var d = locals[cdt][cdn];

        var comm = d.serial_no.includes(',');
        var spc = d.serial_no.includes(' ');
        
        if(spc === true){
            frappe.call({
                method:"abtl_addon.abtl_addon.doctype.delivery_note.serial_no_space",
                args:{
                    serial_no:d.serial_no
                },
                callback:function(r){
                    console.log(r);
                    d.serial_no = r.message[0];
                    d.qty = r.message[1];
                    
                }
            });
        }
        else if(comm === true){
            frappe.call({
                method:"abtl_addon.abtl_addon.doctype.delivery_note.serial_no_qty_count",
                args:{
                    serial_no:d.serial_no
                },
                callback:function(r){
                    console.log(r);
                    d.serial_no = r.message[0];
                    d.qty = r.message[1];
                    
                }
            });
        }
        else{
            frappe.call({
                method:"abtl_addon.abtl_addon.doctype.delivery_note.serial_no_add_comm",
                args:{
                    serial_no:d.serial_no
                },
                callback:function(r){
                    console.log(r);
                    d.serial_no = r.message[0];
                    d.qty = r.message[1];
                    
                }
            });
        }
    }
});
