// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Item Group', {
	refresh(frm) {
        //Enable Item Has Serial No
		frm.add_custom_button(__("Enable"), function() {
            frappe.call({
            method:"abtl_addon.abtl_addon.doctype.item_group.has_serial_enable_item",
            args:{
                item_group:cur_frm.doc.name,
            },
            // freeze:true,
			// freeze_message:__("Please Wait Update Items"),
            callback:function(r){
                frappe.msgprint("Items Update Successfully!")
            }
            }); 
        }).css({"color":"white", "background-color": "#5ed15a", "font-weight": "600"});
        
        //Disable Item Has Serial No
        frm.add_custom_button(__("Disable"), function() {
            frappe.call({
            method:"abtl_addon.abtl_addon.doctype.item_group.has_serial_disable_item",
            args:{
                item_group:cur_frm.doc.name,
            },
            // freeze:true,
			// freeze_message:__("Please Wait Update Items"),
            callback:function(r){
                frappe.msgprint("Items Update Successfully!")
            }
            });
        }).css({"color":"white", "background-color": "#D3D3D3", "font-weight": "600"});
	}
});