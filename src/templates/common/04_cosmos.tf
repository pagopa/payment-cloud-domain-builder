resource "azurerm_resource_group" "cosmos_rg" {
  name     = "${local.project}-cosmos-rg"
  location = var.location

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}

data "azurerm_subnet" "private_endpoint_subnet" {
  name                 = "{{ private_endpoint_subnet_name }}"
  resource_group_name  = "{{ private_endpoint_subnet_rg_name }}"
  virtual_network_name = "{{ private_endpoint_subnet_vnet_name }}"
}

data "azurerm_private_dns_zone" "privatelink_redis_cache_windows_net" {
  name                = "privatelink.redis.cache.windows.net"
  resource_group_name = "{{ private_dns_zone_rg_name }}"
}

module "cosmos" {
  source = "./.terraform/modules/__v4__/IDH/cosmosdb_account"

  env = var.env
  idh_resource_tier = "cosmos_{{cosmosdb_account_database_type}}4"
  product_name = local.prefix

  domain                     = "{{domain_name}}"
  name                       = "${local.project}-cosmos-account"
  resource_group_name        = azurerm_resource_group.cosmos_rg.name
  location                   = var.location

  main_geo_location_location = var.location

  additional_geo_locations = []

{% if is_dev_public %}
  subnet_id = var.env_short != "d" ? data.azurerm_subnet.private_endpoint_subnet[0].id : null
{% else %}
  subnet_id = data.azurerm_subnet.private_endpoint_subnet.id
{% endif %}

  private_endpoint_config = {
{% if is_dev_public %}
    enabled              = var.env_short != "d"
{% if cosmosdb_account_database_type == "mongo" %}
    private_dns_zone_mongo_ids = var.env_short != "d" ? data.azurerm_private_dns_zone.privatelink_mongo_cosmos_azure_com[0].id : null
    service_connection_name_mongo = var.env_short != "d" ?  "${local.project}-{{domain_name}}-cosmos-mongo-endpoint" : null
    name_mongo = var.env_short != "d" ? "${local.project}-{{domain_name}}-cosmos-mongo-endpoint" : null
{% endif %}
{% if cosmosdb_account_database_type == "sql" %}
    private_dns_zone_sql_ids = var.env_short != "d" ? data.azurerm_private_dns_zone.privatelink_documents_azure_com[0].id : null
    name_sql = var.env_short != "d" ? "${local.project}-{{domain_name}}-cosmos-mongo-endpoint" : null
{% endif %}

{% else %}
      enabled = true
{% if cosmosdb_account_database_type == "mongo" %}
    private_dns_zone_mongo_ids = data.azurerm_private_dns_zone.privatelink_mongo_cosmos_azure_com.id
    service_connection_name_mongo = "${local.project}-{{domain_name}}-cosmos-mongo-endpoint"
    name_mongo = "${local.project}-{{domain_name}}-cosmos-mongo-endpoint"
{% endif %}
{% if cosmosdb_account_database_type == "sql" %}
    private_dns_zone_sql_ids = data.azurerm_private_dns_zone.privatelink_documents_azure_com[0].id
    name_sql = "${local.project}-{{domain_name}}-cosmos-mongo-endpoint"
{% endif %}
{% endif %}


  }


  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}


resource "azurerm_key_vault_secret" "cosmos_{{domain_name}}_pkey" {
  name         = "afm-marketplace-${var.env_short}-cosmos-pkey"
  value        = module.cosmos.primary_key
  content_type = "text/plain"

  key_vault_id = module.key_vault.id
}
