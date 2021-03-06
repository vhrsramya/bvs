# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyCriminalCheck(Document):
	pass


@frappe.whitelist()
def get_check(applicant_id):
	criminal_check_id = frappe.get_list("Criminal Check", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return criminal_check_id


