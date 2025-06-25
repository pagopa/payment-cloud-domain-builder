locals {
  domain        = "{{domain_name}}"
  prefix        = "{{product_name}}"
  product       = "${local.prefix}-${var.env_short}"
  project_short = "${local.prefix}-${var.env_short}-${local.domain}"
  project       = "${local.prefix}-${var.env_short}-${var.location_short}-${local.domain}"
  vnet_name = "{{ vnet_name }}"
  vnet_resource_group_name = "{{ vnet_rg_name }}"

  log_analytics_workspace_name                = "{{log_analytics_ws_name}}"
  log_analytics_workspace_resource_group_name = "{{log_analytics_ws_rg_name}}"

  monitor_resource_group_name = "{{monitor_rg_name}}"
  monitor_action_group_slack_name = "{{monitor_action_group_slack_name}}"
  monitor_action_group_email_name = "{{monitor_action_group_email_name}}"
  monitor_action_group_opsgenie_name = "{{monitor_action_group_opsgenie_name}}"


  internal_dns_zone_name                = "${var.dns_zone_internal_prefix}.${var.external_domain}"
  internal_dns_zone_resource_group_name = "{{internal_dns_zone_resource_group_name}}"

{% if include_kubernetes %}
  aks_name = "{{aks_name}}"
  aks_rg_name = "{{aks_rg_name}}"
  ingress_hostname = "${var.location_short}.${local.domain}"
{% endif %}

}