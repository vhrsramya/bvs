// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Verifier Dashboard', {
	onload: function(frm) {
		frappe.call({
			"method":"bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_checks",
			args:{
			},
			callback: function (r) {
				$.each(r.message, function(i, d) {
					if(r.message){							
						var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list"); 
						row.pending_checks = "1";
						row.check_name = d.name;
						row.allocated_for = d.allocated_for;
						row.executive = d.executive;
						row.checks = d.doctype;	
						row.customer = d.customer;						
					}
					
				});
				refresh_field("verify_dashboard_list");  
			}
		})
	},
	checks: function(frm) {
        if(frm.doc.check != "Select"){
			frm.clear_table("verify_dashboard_list");
			frappe.call({
                "method":"bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_check",
				args:{
					"check":frm.doc.checks
				},
				callback: function (r) {
					$.each(r.message, function(i, d) {
						if(r.message){							
							var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list"); 
							row.pending_checks = "1";
							row.check_name = d.name;
							row.allocated_for = d.allocated_for;
							row.executive = d.executive;
							row.checks = d.doctype;	
							row.customer = d.customer;						
						}						
				    });
					refresh_field("verify_dashboard_list");  
				}
				
            });
		}
		
	},
	customer: function(frm){
		if(frm.doc.customer){
			frm.clear_table("verify_dashboard_list");
			frappe.call({
                "method":"bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_check",
				args:{
					"check":frm.doc.checks 
				},
				callback: function (r) {
					$.each(r.message, function(i, d) {
						if(d.customer === frm.doc.customer){							
							var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list"); 
							row.pending_checks = "1";
							row.check_name = d.name;
							row.allocated_for = d.allocated_for;
							row.executive = d.executive;
							row.checks = d.doctype;	
							row.customer = d.customer;						
						}
						
				    });
					refresh_field("verify_dashboard_list");  
				}
				
            });
		}	
	},
	'onload_post_render': function(frm, cdt, cdn) {
		var list = frm.doc.verify_dashboard_list;
		frm.fields_dict.verify_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="check_name"][data-doctype="Verify Dashboard List"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["Verify Dashboard List"][current_doc];
			frappe.set_route('Form',d.checks,d.check_name) ;
		})
	}
});