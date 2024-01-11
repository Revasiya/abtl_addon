from . import __version__ as app_version

app_name = "abtl_addon"
app_title = "Abtl Addon"
app_publisher = "envisionx Oman"
app_description = "ABTL Addon"
app_email = "sajid@erpnextoman.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/abtl_addon/css/abtl_addon.css"
# app_include_js = "/assets/abtl_addon/js/abtl_addon.js"

# include js, css files in header of web template
# web_include_css = "/assets/abtl_addon/css/abtl_addon.css"
# web_include_js = "/assets/abtl_addon/js/abtl_addon.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "abtl_addon/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Customer" : "public/js/customer.js",
    "Warehouse" : "public/js/warehouse.js",
    "Supplier" : "public/js/supplier.js",
    "Item":"public/js/item.js",
    "Sales Invoice":"public/js/sales_invoice.js",
    "Sales Order":"public/js/sales_order.js",
    "Payment Entry":"public/js/payment_entry.js",
    "Delivery Note":"public/js/delivery_note.js",
    # "User":"public/js/user.js",
    # "Purchase Receipt":"public/js/purchase_receipt.js",
    }
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "abtl_addon.utils.jinja_methods",
#	"filters": "abtl_addon.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "abtl_addon.install.before_install"
# after_install = "abtl_addon.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "abtl_addon.uninstall.before_uninstall"
# after_uninstall = "abtl_addon.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "abtl_addon.utils.before_app_install"
# after_app_install = "abtl_addon.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "abtl_addon.utils.before_app_uninstall"
# after_app_uninstall = "abtl_addon.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "abtl_addon.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

doc_events = {
	"Item Price": {
		"after_insert": "abtl_addon.abtl_addon.doctype.item_price.after_insert"
	},
  "User": {
		"after_insert": "abtl_addon.abtl_addon.doctype.user.after_insert"
	},
  "Stock Entry": {
		"on_submit": "abtl_addon.abtl_addon.doctype.stock_entry.on_submit"
	},
  "Sales Order": {
		"validate": "abtl_addon.abtl_addon.doctype.sales_order.validate"
	}

}


# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"abtl_addon.tasks.all"
#	],
#	"daily": [
#		"abtl_addon.tasks.daily"
#	],
#	"hourly": [
#		"abtl_addon.tasks.hourly"
#	],
#	"weekly": [
#		"abtl_addon.tasks.weekly"
#	],
#	"monthly": [
#		"abtl_addon.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "abtl_addon.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "abtl_addon.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "abtl_addon.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["abtl_addon.utils.before_request"]
# after_request = ["abtl_addon.utils.after_request"]

# Job Events
# ----------
# before_job = ["abtl_addon.utils.before_job"]
# after_job = ["abtl_addon.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"abtl_addon.auth.validate"
# ]
