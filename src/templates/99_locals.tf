locals {
  product       = "${var.prefix}-${var.env_short}"
  project_short = "${var.prefix}-${var.env_short}-${var.domain}"
  project       = "${var.prefix}-${var.env_short}-${var.location_short}-${var.domain}"

  vnet_name = "{{ vnet_name }}"
  vnet_resource_group_name = "{{ vnet_rg_name }}"
}