// Copyright (c) 2024, envisionx Oman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Return Entry', {
    refresh: function(frm) {
		frm.set_query("vat", function() {
			return {
				filters: {
					"is_group": "0",
                    "account_type":"Tax"
				}
		    };
		});

        //Debtors Filter
        frm.set_query("debtors_account", function() {
			return {
				filters: {
					"is_group": "0",
                    "account_type":"Receivable"
				}
		    };
		});

        //Cash Filter
        frm.set_query("cash_account", function() {
			return {
				filters: {
					"is_group": "0",
                    "account_type":"Cash"
				}
		    };
		});
		
		//Child Table Filter
		frm.fields_dict['items'].grid.get_field('s_warehouse').get_query = function(doc, cdt, cdn) {
        var child = locals[cdt][cdn];
            return {    
                filters:[
                    ['is_group', '=', "0"]
                ]
            };
        };
	},
    validate: function(frm) {
	    if(cur_frm.doc.net_total_amount){
	        if(cur_frm.doc.vat_rate === "5"){
    	        cur_frm.set_value('total_amount', cur_frm.doc.net_total_amount + cur_frm.doc.total_tax_amount );
                refresh_field('total_amount');
	        }
	        else{
	            cur_frm.set_value('total_amount', cur_frm.doc.net_total_amount + cur_frm.doc.total_tax_amount );
                refresh_field('total_amount');
	        }
	    }
	},
	vat_rate: function(frm) {
	    if(cur_frm.doc.net_total_amount){
	        if(cur_frm.doc.vat_rate === "5"){
    	        cur_frm.set_value('total_tax_amount', cur_frm.doc.net_total_amount * 0.05 );
                refresh_field('total_tax_amount');
	        }
	        else{
	            cur_frm.set_value('total_tax_amount', cur_frm.doc.net_total_amount * 0.00 );
                refresh_field('total_tax_amount');
	        }
	    }
	    else{
	        frappe.msgprint("Please Check Item With Amount");
	    }
        
	},
	total_tax_amount: function(frm) {
	    cur_frm.set_value('total_amount', cur_frm.doc.net_total_amount + cur_frm.doc.total_tax_amount );
        refresh_field('total_amount');
	},
	net_total_amount: function(frm) {
	    if(cur_frm.doc.net_total_amount){
	        if(cur_frm.doc.vat_rate === "5"){
    	        cur_frm.set_value('total_tax_amount', cur_frm.doc.net_total_amount * 0.05 );
                refresh_field('total_tax_amount');
	        }
	        else{
	            cur_frm.set_value('total_tax_amount', cur_frm.doc.net_total_amount * 0.00 );
                refresh_field('total_tax_amount');
	        }
	    }
	}
});

frappe.ui.form.on('Sales Return Entry Details', {
    items_remove: function(frm, cdt, cdn) {
	    var d = locals[cdt][cdn];
        //Total Qty
        var total_qty = 0;
        cur_frm.doc.items.forEach(function(d) {
            total_qty += d.qty;
        });
        frm.set_value('total_qty', total_qty);
        refresh_field('total_qty');
        
        //Total Amount
        var total = 0;
        cur_frm.doc.items.forEach(function(d) {
            total += d.amount;
        });
        frm.set_value('net_total_amount', total);
        refresh_field('net_total_amount');
	},
	qty: function(frm, cdt, cdn) {
	    var d = locals[cdt][cdn];
        frappe.model.set_value(d.doctype, d.name, "amount", d.qty * d.basic_rate);
        
        //Total Qty
        var total = 0;
        cur_frm.doc.items.forEach(function(d) {
            total += d.qty;
        });
        frm.set_value('total_qty', total);
        refresh_field('total_qty');
	},
	item_code: function(frm, cdt, cdn) {
	    var d = locals[cdt][cdn];
        //Total Qty
        var total_qty = 0;
        cur_frm.doc.items.forEach(function(d) {
            total_qty += d.qty;
        });
        frm.set_value('total_qty', total_qty);
        refresh_field('total_qty');
        
        //Total Amount
        var total = 0;
        cur_frm.doc.items.forEach(function(d) {
            total += d.amount;
        });
        frm.set_value('net_total_amount', total);
        refresh_field('net_total_amount');
	},
	basic_rate: function(frm, cdt, cdn) {
	    var d = locals[cdt][cdn];
        frappe.model.set_value(d.doctype, d.name, "amount", d.qty * d.basic_rate);
	},
	amount: function(frm, cdt, cdn) {
	    var d = locals[cdt][cdn];
        var total = 0;
        cur_frm.doc.items.forEach(function(d) {
            total += d.amount;
        });
        frm.set_value('net_total_amount', total);
        refresh_field('net_total_amount');
	}
});
