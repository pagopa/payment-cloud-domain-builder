locals {
  domain        = "{{domain_name}}"
  domain_short  = "{{domain_name_short}}"
  prefix        = "{{product_name}}"
  product       = "${local.prefix}-${var.env_short}"
  project_short = "${local.prefix}-${var.env_short}-${var.location_short}-${local.domain_short}"
  project       = "${local.prefix}-${var.env_short}-${var.location_short}-${local.domain}"


  hub_vnet_name = "{{ hub_vnet_name }}"
  hub_vnet_resource_group_name = "{{ hub_vnet_rg }}"
  spoke_data_vnet_name = "{{ data_vnet_name }}"
  spoke_data_vnet_resource_group_name = "{{ data_vnet_rg }}"
  spoke_security_vnet_name = "{{ security_vnet_name }}"
  spoke_security_vnet_resource_group_name = "{{ security_vnet_rg }}"
  spoke_streaming_vnet_name = "{{ streaming_vnet_name }}"
  spoke_streaming_vnet_resource_group_name = "{{ streaming_vnet_rg }}"
  spoke_compute_vnet_name = "{{ compute_vnet_name }}"
  spoke_compute_vnet_resource_group_name = "{{ compute_vnet_rg }}"
  spoke_tools_vnet_name = "{{ tools_vnet_name }}"
  spoke_tools_vnet_resource_group_name = "{{ tools_vnet_rg }}"

  log_analytics_workspace_name                = "{{log_analytics_ws_name}}"
  log_analytics_workspace_resource_group_name = "{{log_analytics_ws_rg_name}}"

  monitor_resource_group_name = "{{monitor_rg_name}}"
  monitor_action_group_slack_name = "{{monitor_action_group_slack_name}}"
  monitor_action_group_email_name = "{{monitor_action_group_email_name}}"
  monitor_action_group_opsgenie_name = "{{monitor_action_group_opsgenie_name}}"
  private_dns_zone_rg_name           = "{{private_dns_zone_rg_name}}"

  internal_dns_zone_name                = "${var.dns_zone_internal_prefix}.${var.external_domain}"
  internal_dns_zone_resource_group_name = "{{internal_dns_zone_resource_group_name}}"

{% if include_kubernetes %}
  aks_name = "{{aks_name}}"
  aks_rg_name = "{{aks_rg_name}}"
  ingress_hostname = "${var.location_short}${var.env}.${local.domain}"
{% endif %}

}