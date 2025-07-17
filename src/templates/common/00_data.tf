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
  count               = var.alert_use_opsgenie ? 1 : 0
  resource_group_name = local.monitor_resource_group_name
  name                = local.monitor_action_group_opsgenie_name
}

data "azurerm_key_vault" "domain_kv" {
  name                = "${local.project}-kv"
  resource_group_name = "${local.project}-sec-rg"
}
#
# Private DNS Zones
#
data "azurerm_private_dns_zone" "internal" {
  name                = local.internal_dns_zone_name
  resource_group_name = local.internal_dns_zone_resource_group_name
}


{% if include_postgresql %}
data "azurerm_private_dns_zone" "postgres" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "private.postgres.database.azure.com"
  resource_group_name = data.azurerm_resource_group.rg_vnet.name
}
{% endif %}


data "azurerm_subnet" "private_endpoint_subnet" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                 = "{{ private_endpoint_subnet_name }}"
  resource_group_name  = "{{ private_endpoint_subnet_rg_name }}"
  virtual_network_name = "{{ private_endpoint_subnet_vnet_name }}"
}

{% if include_redis %}
data "azurerm_private_dns_zone" "privatelink_redis_cache_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.redis.cache.windows.net"
  resource_group_name = "{{ private_dns_zone_rg_name }}"
}
{% endif %}

{% if include_cosmosdb %}
{% if cosmosdb_account_database_type == "mongo" %}
data "azurerm_private_dns_zone" "privatelink_mongo_cosmos_azure_com" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.mongo.cosmos.azure.com"
  resource_group_name = "{{ private_dns_zone_rg_name }}"
}
{% else %}
data "azurerm_private_dns_zone" "privatelink_documents_azure_com" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.documents.azure.com"
  resource_group_name = "{{ private_dns_zone_rg_name }}"
}
{% endif %}
{% endif %}