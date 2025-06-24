data "azurerm_key_vault" "key_vault" {
  name                = "${local.product}-${var.location_short}-${local.domain}-kv"
  resource_group_name = "${local.product}-${var.location_short}-${local.domain}-sec-rg"
}

data "azurerm_virtual_network" "vnet" {
  name                = local.vnet_name
  resource_group_name = local.vnet_resource_group_name
}

data "azurerm_resource_group" "rg_vnet" {
  name = local.vnet_resource_group_name
}

data "azurerm_log_analytics_workspace" "log_analytics_workspace" {
  name                = local.log_analytics_workspace_name
  resource_group_name = local.log_analytics_workspace_resource_group_name
}

data "azurerm_monitor_action_group" "slack" {
  resource_group_name = local.monitor_resource_group_name
  name                = local.monitor_action_group_slack_name
}

data "azurerm_monitor_action_group" "email" {
  resource_group_name = local.monitor_resource_group_name
  name                = local.monitor_action_group_email_name
}


data "azurerm_monitor_action_group" "opsgenie" {
  count               = var.env_short == "p" ? 1 : 0
  resource_group_name = local.monitor_resource_group_name
  name                = local.monitor_action_group_opsgenie_name
}


{% if include_02_postgresql %}
data "azurerm_private_dns_zone" "postgres" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "private.postgres.database.azure.com"
  resource_group_name = data.azurerm_resource_group.rg_vnet.name
}
{% endif %}