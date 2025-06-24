locals {
  domain        = "{{domain_name}}"
  product       = "${var.prefix}-${var.env_short}"
  project_short = "${var.prefix}-${var.env_short}-${local.domain}"
  project       = "${var.prefix}-${var.env_short}-${var.location_short}-${local.domain}"
  vnet_name = "{{ vnet_name }}"
  vnet_resource_group_name = "{{ vnet_rg_name }}"

  log_analytics_workspace_name                = "{{log_analytics_ws_name}}"
  log_analytics_workspace_resource_group_name = "{{log_analytics_ws_rg_name}}"

  monitor_resource_group_name = "{{monitor_rg_name}}"
  monitor_action_group_slack_name = "{{monitor_action_group_slack_name}}"
  monitor_action_group_email_name = "{{monitor_action_group_email_name}}"
  monitor_action_group_opsgenie_name = "{{monitor_action_group_opsgenie_name}}"
}