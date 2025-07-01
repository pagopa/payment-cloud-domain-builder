// types/form.ts
export type FormData = {
  domain_name: string;
  is_dev_public: boolean;
  storage_account_state_name: string;
  storage_account_container_state_name: string;
  subscription: string;
  log_analytics_ws_name: string;
  log_analytics_ws_rg_name: string;
  monitor_rg_name: string;
  monitor_action_group_slack_name: string;
  monitor_action_group_email_name: string;
  monitor_action_group_opsgenie_name: string;
  azdo_managed_identity_rg_name: string;
  azdo_managed_identity_iac_prefix: string;
  vnet_name: string;
  vnet_rg_name: string;
  product_name: string;
  location: string;
};

export const defaultForm: FormData = {
  domain_name: "",
  is_dev_public: false,
  storage_account_state_name: "",
  storage_account_container_state_name: "",
  subscription: "",
  log_analytics_ws_name: "",
  log_analytics_ws_rg_name: "",
  monitor_rg_name: "",
  monitor_action_group_slack_name: "",
  monitor_action_group_email_name: "",
  monitor_action_group_opsgenie_name: "",
  azdo_managed_identity_rg_name: "",
  azdo_managed_identity_iac_prefix: "",
  vnet_name: "",
  vnet_rg_name: "",
  product_name: "",
  location: "",
};