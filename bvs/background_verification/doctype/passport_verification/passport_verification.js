// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Passport Verification", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.passport_number){
			me = $(cur_frm.fields_dict.passport_number.input);
			me.attr("length", "8");
			if(frappe.user.has_role("BVS DEO") || frappe.user.has_role("BVS Manager")) {
			    frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
		frappe.call({
			"method":"bvs.background_verification.doctype.aadhar_card_verification.aadhar_card_verification.get_value",
			args: {
				"applicant":frm.doc.applicant_id,
				},
			callback: function (r) {
				// $.each(r.message, function(i, d) {
				if(r.message){
					console.log(r.message)
					frm.set_value("date_of_birth", r.message.dob);
					frm.set_value("address", r.message.address_line1 + ",\n"+ r.message.address_line2 + ",\n"+ r.message.address_line3 + ",\n"+ r.message.talukdistrict + ",\n"+ r.message.city + ",\n"+ r.message.state + ",\n"+ r.message.country + ",\n"+ r.message.pincode);

				}
				// })
			}
		});
	},
	validate: function(frm){
		if(frm.doc.allocated_for != frm.doc.status){
			frm.set_value("executive","");
		}
		if(frm.doc.allocated_for == "IQC Pending"){
			frm.set_value("status","IQC Completed")
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			frm.set_value("status","Allocation Completed")
		}
		if(!frm.doc.passport_number){
			frappe.msgprint("Please Enter the Passport Number")
		}
		if(frm.doc.allocated_for == "Entry Pending"){
			frm.set_value("status","Entry Completed")
		}
	}
});
