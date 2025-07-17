
// types/form.ts
export type FormData = {
  // Common template vars
  include_postgresql: boolean;
  include_tag_config: boolean;
  include_kubernetes: boolean;
  include_apim: boolean;
  include_cosmosdb: boolean;
  include_redis: boolean;
  tag_source: string;

  domain_name: string;
  is_dev_public: boolean;
  storage_account_state_name: string;
  storage_account_container_state_name: string;
  storage_account_state_rg_name: string;
  subscription: string;
  external_domain: string;
  dns_zone_internal_prefix: string;

  log_analytics_ws_name: string;
  log_analytics_ws_rg_name: string;
  monitor_rg_name: string;
  monitor_action_group_slack_name: string;
  monitor_action_group_email_name: string;
  monitor_action_group_opsgenie_name: string;

  // secrets
  azdo_managed_identity_rg_name: string;
  azdo_managed_identity_iac_prefix: string;

  // aks
  aks_name: string;
  aks_rg_name: string;
  ingress_load_balancer_ip: string;

  internal_dns_zone_resource_group_name: string;
  application_insight_name: string;

  apim_name: string;
  apim_rg_name: string;

  vnet_name: string;
  vnet_rg_name: string;

  // cae
  gh_runner_cae_name: string;
  gh_runner_cae_rg: string;
  gh_runner_pat_key: string;
  gh_runner_pat_kv_name: string;
  gh_runner_pat_kv_rg: string;

  product_name: string;
  location: string;
  location_mapping: Record<string, string>;
  location_string_mapping: Record<string, string>;
};

export const defaultForm: FormData = {
  // Common template vars
  include_postgresql: false,
  include_tag_config: false,
  include_kubernetes: false,
  include_apim: false,
  include_cosmosdb: false,
  include_redis: false,
  tag_source: "",

  domain_name: "",
  is_dev_public: false,
  storage_account_state_name: "",
  storage_account_container_state_name: "",
  storage_account_state_rg_name: "",
  subscription: "",
  external_domain: "",
  dns_zone_internal_prefix: "",

  log_analytics_ws_name: "",
  log_analytics_ws_rg_name: "",
  monitor_rg_name: "",
  monitor_action_group_slack_name: "",
  monitor_action_group_email_name: "",
  monitor_action_group_opsgenie_name: "",

  // secrets
  azdo_managed_identity_rg_name: "",
  azdo_managed_identity_iac_prefix: "",

  // aks
  aks_name: "",
  aks_rg_name: "",
  ingress_load_balancer_ip: "",

  internal_dns_zone_resource_group_name: "",
  application_insight_name: "",

  apim_name: "",
  apim_rg_name: "",

  vnet_name: "",
  vnet_rg_name: "",

  // cae
  gh_runner_cae_name: "",
  gh_runner_cae_rg: "",
  gh_runner_pat_key: "",
  gh_runner_pat_kv_name: "",
  gh_runner_pat_kv_rg: "",

  product_name: "",
  location: "",
  location_mapping: {},
  location_string_mapping: {},
};