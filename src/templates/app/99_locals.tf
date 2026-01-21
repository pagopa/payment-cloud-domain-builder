locals {
  domain        = "{{domain_name}}"
  prefix        = "{{product_name}}"
  product       = "${local.prefix}-${var.env_short}"
  project_short = "${local.prefix}-${var.env_short}-${local.domain}"
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
  private_dns_zone_rg_name = "{{private_dns_zone_rg_name}}"

  monitor_rg_name = "{{monitor_rg_name}}"

  log_analytics_workspace_name                = "{{log_analytics_ws_name}}"
  log_analytics_workspace_resource_group_name = "{{log_analytics_ws_rg_name}}"
  application_insight_name = "{{application_insight_name}}"

  monitor_resource_group_name = "{{monitor_rg_name}}"
  monitor_action_group_slack_name = "{{monitor_action_group_slack_name}}"
  monitor_action_group_email_name = "{{monitor_action_group_email_name}}"
  monitor_action_group_opsgenie_name = "{{monitor_action_group_opsgenie_name}}"

  internal_dns_zone_name                = "${var.dns_zone_internal_prefix}.${var.external_domain}"
  internal_dns_zone_resource_group_name = "{{internal_dns_zone_resource_group_name}}"

  gh_runner_cae_name = "{{gh_runner_cae_name}}"
  gh_runner_cae_rg = "{{gh_runner_cae_rg}}"
  gh_runner_pat_key = "{{gh_runner_pat_key}}"
  gh_runner_pat_kv_name = "{{gh_runner_pat_kv_name}}"
  gh_runner_pat_kv_rg = "{{gh_runner_pat_kv_rg}}"


{% if include_apim %}
  apim_name = "{{apim_name}}"
  apim_rg_name = "{{apim_rg_name}}"
{% endif %}

{% if include_kubernetes %}
  aks_name = "{{aks_name}}"
  aks_rg_name = "{{aks_rg_name}}"
  domain_hostname = "${var.dns_zone_prefix}.${local.internal_dns_zone_name}"
{% endif %}

{% if include_app_service_webapp %}
  {{app_service_webapp_name_snake}}_rg_name = "${local.project}-{{app_service_webapp_name_kebab}}-rg"
{% endif %}

{% if include_app_service_function %}
{{app_service_function_name_snake}}_rg_name = "${local.project}-{{app_service_function_name_kebab}}-rg"
{% endif %}

}
