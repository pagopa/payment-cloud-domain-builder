data "azurerm_key_vault" "domain_kv" {
  name                = "${local.product}-${var.location_short}-${local.domain_short}-kv"
  resource_group_name = "${local.product}-${var.location_short}-${local.domain}-sec-rg"
}


data "azurerm_virtual_network" "hub_vnet" {
  name                = local.hub_vnet_name
  resource_group_name = local.hub_vnet_resource_group_name
}

data "azurerm_virtual_network" "spoke_data_vnet" {
  name                = local.spoke_data_vnet_name
  resource_group_name = local.spoke_data_vnet_resource_group_name
}

data "azurerm_virtual_network" "spoke_compute_vnet" {
  name                = local.spoke_compute_vnet_name
  resource_group_name = local.spoke_compute_vnet_resource_group_name
}

data "azurerm_virtual_network" "spoke_security_vnet" {
  name                = local.spoke_security_vnet_name
  resource_group_name = local.spoke_security_vnet_resource_group_name
}

data "azurerm_virtual_network" "spoke_streaming_vnet" {
  name                = local.spoke_streaming_vnet_name
  resource_group_name = local.spoke_streaming_vnet_resource_group_name
}

data "azurerm_virtual_network" "spoke_tools_vnet" {
  name                = local.spoke_tools_vnet_name
  resource_group_name = local.spoke_tools_vnet_resource_group_name
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
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}



{% if include_redis %}
data "azurerm_private_dns_zone" "privatelink_redis_cache_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.redis.cache.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}

{% if include_cosmosdb %}

{% if cosmosdb_account_database_type == "mongo" %}
data "azurerm_private_dns_zone" "privatelink_mongo_cosmos_azure_com" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.mongo.cosmos.azure.com"
  resource_group_name = local.private_dns_zone_rg_name
}
{% else %}
data "azurerm_private_dns_zone" "privatelink_documents_azure_com" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.documents.azure.com"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}
{% endif %}



{% if include_storage_account %}
{% if "blob" in storage_account_data_types  %}
data "azurerm_private_dns_zone" "privatelink_blob_core_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.blob.core.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}

{% if "queue" in storage_account_data_types  %}
data "azurerm_private_dns_zone" "privatelink_queue_core_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.queue.core.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}

{% if "dfs" in storage_account_data_types  %}
data "azurerm_private_dns_zone" "privatelink_dfs_core_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.dfs.core.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}

{% if "file" in storage_account_data_types  %}
data "azurerm_private_dns_zone" "privatelink_file_core_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.file.core.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}

{% if "table" in storage_account_data_types  %}
data "azurerm_private_dns_zone" "privatelink_table_core_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.table.core.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}

{% if "web" in storage_account_data_types  %}
data "azurerm_private_dns_zone" "privatelink_web_core_windows_net" {
  {% if is_dev_public %}
  count               = var.env_short != "d" ? 1 : 0
  {% endif %}
  name                = "privatelink.web.core.windows.net"
  resource_group_name = local.private_dns_zone_rg_name
}
{% endif %}
{% endif %}

