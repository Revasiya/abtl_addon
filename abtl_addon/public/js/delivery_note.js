// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Delivery Note Item', {
    custom_is_export:function(frm,cdt,cdn) {
        var d = locals[cdt][cdn];
        if(d.custom_is_export == 1){
            
            frappe.db.get_list('Item',{ 
            fields:['item_group'], 
            filters:{ 
                'name':d.item_code 
            } 
            }).then(function(r){ 
            console.log(r);
            if(r[0].item_group == "Mobile Set"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 0);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            }  
            
            if(r[0].item_group == "Accessories"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 0);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            } 
            
            if(r[0].item_group == "Mobile"){
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden", 0); 
            }
            });
        }
        else{
            frappe.db.get_list('Item',{ 
            fields:['item_group'], 
            filters:{ 
                'name':d.item_code 
            } 
            }).then(function(r){ 
            console.log(r);
            if(r[0].item_group == "Mobile Set"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 1);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            }  
            
            if(r[0].item_group == "Accessories"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 1);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            } 
            
            if(r[0].item_group == "Mobile"){
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden", 1); 
            }
            });
        }
		
	},
    form_render:function(frm,cdt,cdn) {
        var d = locals[cdt][cdn];
        if(d.custom_is_export == 1){
            
            frappe.db.get_list('Item',{ 
            fields:['item_group'], 
            filters:{ 
                'name':d.item_code 
            } 
            }).then(function(r){ 
            console.log(r);
            if(r[0].item_group == "Mobile Set"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 0);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            }  
            
            if(r[0].item_group == "Accessories"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 0);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            } 
            
            if(r[0].item_group == "Mobile"){
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden", 0); 
            }
            });
        }
        else{
            frappe.db.get_list('Item',{ 
            fields:['item_group'], 
            filters:{ 
                'name':d.item_code 
            } 
            }).then(function(r){ 
            console.log(r);
            if(r[0].item_group == "Mobile Set"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 1);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            }  
            
            if(r[0].item_group == "Accessories"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 1);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            } 
            
            if(r[0].item_group == "Mobile"){
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden", 1); 
            }
            });
        }
        
    },
    item_code:function(frm,cdt,cdn) {
        var d = locals[cdt][cdn];
        frappe.db.get_list('Item',{ 
        fields:['item_group'], 
        filters:{ 
            'name':d.item_code 
        } 
        }).then(function(r){ 
            console.log(r);
            if(r[0].item_group == "Mobile Set"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 1);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            }  
            
            if(r[0].item_group == "Accessories"){
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd", 1);
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 1);
            } 
            
            if(r[0].item_group == "Mobile"){
                frm.fields_dict.items.grid.update_docfield_property("serial_no", "hidden", 0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "reqd",0);
                frm.fields_dict.items.grid.update_docfield_property("custom_reference_serial_number", "hidden", 1); 
            }
        });
        
    }
});


frappe.ui.form.on('Delivery Note Item', {
    custom_reference_serial_number: function(frm,cdt,cdn) {
        // if(!cur_frm.doc.is_return){
            var d = locals[cdt][cdn];
            var comm = d.custom_reference_serial_number.includes(',');
            var spc = d.custom_reference_serial_number.includes(' ');
            
            if(spc === true){
                frappe.call({
                    method:"abtl_addon.abtl_addon.doctype.delivery_note.serial_no_space",
                    args:{
                        serial_no:d.custom_reference_serial_number
                    },
                    callback:function(r){
                        // console.log(r);
                        d.custom_reference_serial_number = r.message[0];
                        d.qty = r.message[1];
                        
                    }
                });
            }
            else{
                frappe.call({
                    method:"abtl_addon.abtl_addon.doctype.delivery_note.serial_no_add_comm",
                    args:{
                        serial_no:d.custom_reference_serial_number
                    },
                    callback:function(r){
                        console.log(r);
                        d.custom_reference_serial_number = r.message[0];
                        d.qty = r.message[1];
                        
                    }
                });
            }
        }
    // }
});

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
