resource "azurerm_resource_group" "storage_account_rg" {
  name     = "${local.product}-storage-account-rg"
  location = var.location

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}


module "{{domain_name_snake}}_{{storage_account_scope_name}}_storage_account" {
  source = "./.terraform/modules/__v4__/IDH/storage_account"

  name = replace("${local.project}-{{storage_account_scope_name}}-sa", "-", "")

  product_name        = local.prefix
  env                 = var.env
  idh_resource_tier   = "basic"
  domain              = local.domain
  location            = var.location
  resource_group_name = azurerm_resource_group.storage_account_rg.name

{% if is_dev_public %}
  embedded_subnet = {
    enabled      = var.env_short == "d"
    vnet_name    = local.spoke_data_vnet_name
    vnet_rg_name = local.spoke_data_vnet_resource_group_name
  }

{% if "queue" in storage_account_data_types  %}
  private_dns_zone_queue_ids  = var.env_short == "d" ? [] : data.azurerm_private_dns_zone.privatelink_queue_core_windows_net[0].id
{% endif     %}
{% if "blob" in storage_account_data_types  %}
  private_dns_zone_blob_ids   = var.env_short == "d" ? [] : data.azurerm_private_dns_zone.privatelink_blob_core_windows_net[0].id
{% endif %}
{% if "dfs" in storage_account_data_types  %}
  private_dns_zone_dfs_ids    = var.env_short == "d" ? [] : data.azurerm_private_dns_zone.privatelink_dfs_core_windows_net[0].id
{% endif %}
{% if "file" in storage_account_data_types  %}
  private_dns_zone_file_ids   = var.env_short == "d" ? [] : data.azurerm_private_dns_zone.privatelink_file_core_windows_net[0].id
{% endif %}
{% if "web" in storage_account_data_types  %}
  private_dns_zone_web_ids    = var.env_short == "d" ? [] : data.azurerm_private_dns_zone.privatelink_web_core_windows_net[0].id
{% endif %}
{% if "table" in storage_account_data_types  %}
  private_dns_zone_table_ids  = var.env_short == "d" ? [] : data.azurerm_private_dns_zone.privatelink_table_core_windows_net[0].id
{% endif %}

{% else %}
  embedded_subnet = {
    enabled      = true
    vnet_name    = local.spoke_data_vnet_name
    vnet_rg_name = local.spoke_data_vnet_resource_group_name
  }
{% if "queue" in storage_account_data_types  %}
  private_dns_zone_queue_ids  = data.azurerm_private_dns_zone.privatelink_queue_core_windows_net
{% endif     %}
{% if "blob" in storage_account_data_types  %}
  private_dns_zone_blob_ids   = data.azurerm_private_dns_zone.privatelink_blob_core_windows_net
{% endif %}
{% if "dfs" in storage_account_data_types  %}
  private_dns_zone_dfs_ids    = data.azurerm_private_dns_zone.privatelink_dfs_core_windows_net
{% endif %}
{% if "file" in storage_account_data_types  %}
  private_dns_zone_file_ids   = data.azurerm_private_dns_zone.privatelink_file_core_windows_net
{% endif %}
{% if "web" in storage_account_data_types  %}
  private_dns_zone_web_ids    = data.azurerm_private_dns_zone.privatelink_web_core_windows_net
{% endif %}
{% if "table" in storage_account_data_types  %}
  private_dns_zone_table_ids  = data.azurerm_private_dns_zone.privatelink_table_core_windows_net
{% endif %}
{% endif %}

  # fixme configure the cidr list and service name allowed on this storage account
  embedded_nsg_configuration    = {
    source_address_prefixes      = ["*"]
    source_address_prefixes_name = "All"
  }

  tags                = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}
