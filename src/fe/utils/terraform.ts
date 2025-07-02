// utils/terraform.ts
export function renderTerraformPreview(data: FormData): string {
  return `module "idh" {
  source = "./modules/idh"
  domain_name = "${data.domain_name}"
  is_dev_public = ${data.is_dev_public}
  storage_account_state_name = "${data.storage_account_state_name}"
  storage_account_container_state_name = "${data.storage_account_container_state_name}"
  subscription = "${data.subscription}"
  log_analytics_ws_name = "${data.log_analytics_ws_name}"
  log_analytics_ws_rg_name = "${data.log_analytics_ws_rg_name}"
  monitor_rg_name = "${data.monitor_rg_name}"
  monitor_action_group_slack_name = "${data.monitor_action_group_slack_name}"
  monitor_action_group_email_name = "${data.monitor_action_group_email_name}"
  monitor_action_group_opsgenie_name = "${data.monitor_action_group_opsgenie_name}"
  azdo_managed_identity_rg_name = "${data.azdo_managed_identity_rg_name}"
  azdo_managed_identity_iac_prefix = "${data.azdo_managed_identity_iac_prefix}"
  vnet_name = "${data.vnet_name}"
  vnet_rg_name = "${data.vnet_rg_name}"
  product_name = "${data.product_name}"
  location = "${data.location}"
}`;
}