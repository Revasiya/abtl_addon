// Copyright (c) 2023, envisionx Oman and contributors
// For license information, please see license.txt

// Item Name Creted
frappe.ui.form.on('Item', {
	refresh(frm) {
		if(!cur_frm.is_new()){
			// frm.set_df_property('item_code','hidden', 0);
			frm.set_df_property('include_item_in_manufacturing','hidden', 1);
			frm.set_df_property('item_name','read_only', 1);
			frm.set_df_property('custom_item_serial','read_only', 1);
			
			if(cur_frm.is_new()){
				frm.set_df_property('custom_speed','hidden', 1);
				frm.set_df_property('custom_size','hidden', 1);
				frm.set_df_property('custom_color','hidden', 1);
			}
			//Brnad Filter
			if(cur_frm.doc.brand){
				frm.set_query("custom_item_model", function(frm) {
					return {
						filters: {"brand": cur_frm.doc.brand}
					};
				});
			}
		}
	},
	item_name: function(frm) {
		if(!cur_frm.is_new()){
			 frappe.db.get_list('Item',{ 
			 fields:['name'], 
			 filters:{ 
				 'item_name':cur_frm.doc.item_name
			 } 
			 }).then(function(doc){ 
				 if(doc.length !== 0){
					 var msg_content="<b style='color:red;'>" +`${cur_frm.doc.item_name}`+"</b>";
					 frappe.throw("Item Name Already Created  " + "<b>"+`${msg_content}`+"</b>");
				 }
			 });
		}
		
	 },
	 item_group: function(frm) {
		if(cur_frm.doc.item_group == "Mobile"){
			cur_frm.set_value("has_serial_no",1);
		}
		if(cur_frm.doc.item_group == "Accessories"){
			frm.set_df_property('custom_size','hidden', 1);
			frm.set_df_property('custom_speed','hidden', 1);

			cur_frm.set_value("has_serial_no",0);
		}
		else{
			frm.set_df_property('custom_size','hidden', 0);
			frm.set_df_property('custom_speed','hidden', 0);
		}
		
	 },
	after_save: function(frm) {
		cur_frm.set_value("custom_item_serial", frm.doc.name);
	},
	brand(frm){
	    cur_frm.set_value("custom_item_model", "");
	    frm.set_query("custom_item_model", function(frm) {
			return {
				filters: {"brand": cur_frm.doc.brand}
			};
		});
	},
	custom_item_model(frm) {
	    frm.set_df_property('custom_speed','hidden', 0);

			if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size && cur_frm.doc.custom_color){
				var item_name3 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size+" "+cur_frm.doc.custom_color;
				cur_frm.set_value("item_name", item_name3);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size){
				var item_name2 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size;
				cur_frm.set_value("item_name", item_name2);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed){
				var item_name1 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed;
				cur_frm.set_value("item_name", item_name1);
			}
			else{
				var item_name = cur_frm.doc.custom_item_model;
				cur_frm.set_value("item_name", item_name);
			}	
	},
	custom_speed(frm) {
	    frm.set_df_property('custom_size','hidden', 0);
			if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size && cur_frm.doc.custom_color){
				var item_name3 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size+" "+cur_frm.doc.custom_color;
				cur_frm.set_value("item_name", item_name3);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size){
				var item_name2 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size;
				cur_frm.set_value("item_name", item_name2);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed){
				var item_name1 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed;
				cur_frm.set_value("item_name", item_name1);
			}
			else{
				var item_name = cur_frm.doc.custom_item_model+" "+cur_frm.doc.custom_speed;
				cur_frm.set_value("item_name", item_name);
			}
	},
	custom_size(frm) {
	    frm.set_df_property('custom_color','hidden', 0);
			if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size && cur_frm.doc.custom_color){
				var item_name3 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size+" "+cur_frm.doc.custom_color;
				cur_frm.set_value("item_name", item_name3);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size){
				var item_name2 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size;
				cur_frm.set_value("item_name", item_name2);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed){
				var item_name1 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed;
				cur_frm.set_value("item_name", item_name1);
			}
			else {
				var item_name = cur_frm.doc.custom_item_model+" "+cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size;
				cur_frm.set_value("item_name", item_name);
				console.log(item_name);
			}
	},
	custom_color(frm) {
			if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size && cur_frm.doc.custom_color){
				var item_name3 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size+" "+cur_frm.doc.custom_color;
				cur_frm.set_value("item_name", item_name3);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed && cur_frm.doc.custom_size){
				var item_name2 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size;
				cur_frm.set_value("item_name", item_name2);
			}
			else if(cur_frm.doc.custom_item_model && cur_frm.doc.custom_speed){
				var item_name1 = cur_frm.doc.custom_item_model+" "+ cur_frm.doc.custom_speed;
				cur_frm.set_value("item_name", item_name1);
			}
			else{
				var item_name = cur_frm.doc.custom_item_model+" "+cur_frm.doc.custom_speed+" "+cur_frm.doc.custom_size+" "+cur_frm.doc.custom_color;
				cur_frm.set_value("item_name", item_name);
			}
	},
});

//Item Price List Auto Create

frappe.ui.form.on('Item', {
    onload(frm) {
		frm.set_df_property('item_code','hidden', 1);
		if(!cur_frm.is_new()){
			frappe.db.get_list('Item Price',{ 
				fields:['price_list','price_list_rate'], 
				filters:{ 
					'item_code':cur_frm.doc.name,
					'selling':1
				} 
			}).then(function(r){
				console.log(r);
				frm.doc.custom_item_price = [];
				$.each(r, function(_i, e){
					let entry = frm.add_child("custom_item_price");
					entry.price_list = e.price_list;
					entry.item_rate = e.price_list_rate;
				});
				refresh_field("custom_item_price");
				cur_frm.save();
			}); 
		}
	}
});

// frappe.ui.form.on('Item Price List', {
//     item_rate: function(frm,cdt,cdn) {
//         var d = locals[cdt][cdn];
//         $.each(cur_frm.doc.custom_item_price, function(index, r){ 
//             frappe.db.get_list('Item Price',{ 
//                 fields:['name'], 
//                 filters:{ 
//                     'item_code':cur_frm.doc.name,
//                     'price_list':r.price_list,
//                     'selling':1
//                 } 
//                 }).then(function(doc){ 
//                     // console.log(doc);
//                     if(doc.length !== 0){
//                         frappe.db.get_list('Item Price List History',{ 
//                         fields:['name'], 
//                         filters:{ 
//                             'item_code':cur_frm.doc.name,
//                             'item_price_list':r.price_list,
//                             'item_rate':r.item_rate,
//                         } 
//                         }).then(function(iph){ 
//                             console.log(iph.length);
//                             if(iph.length === 0){
//                                 frappe.db.insert({
//                                     "doctype":"Item Price List History",
//                                     "item_code":cur_frm.doc.name,
//                                     "item_price_list":r.price_list,
//                                     "item_rate":r.item_rate
//                                     // "date":frappe.datetime.nowdate()
//                                 }); 
//                             }
                            
//                         });
                        
//                     }
//                     else{
//                         frappe.db.insert({
//                             "doctype":"Item Price",
//                             "item_code":cur_frm.doc.name,
//                             "price_list":r.price_list,
//                             "price_list_rate":r.item_rate,
//                             'selling':1
//                         });
                        
//                     }
//             });
            
//         });
//         frm.reload_doc();
//     }
// });

