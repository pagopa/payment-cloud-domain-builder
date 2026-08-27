resource "azurerm_resource_group" "cosmos_rg" {
  name     = "${local.project}-cosmos-rg"
  location = var.location

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}




module "cosmos" {
  source = "./.terraform/modules/__v4__/IDH/cosmosdb_account"

  env = var.env
  idh_resource_tier = var.cosmos_idh_resource_tier
  product_name = local.prefix

  domain                     = local.domain
  name                       = "${local.project}-cosmos-account"
  resource_group_name        = azurerm_resource_group.cosmos_rg.name
  location                   = var.location

  main_geo_location_location = var.location

  additional_geo_locations = []


  embedded_subnet = {
    enabled              = true
    vnet_name            = local.spoke_data_vnet_name
    vnet_rg_name         = local.spoke_data_vnet_resource_group_name
  }

  # fixme configure the cidr list and service name allowed on this cosmosdb
  embedded_nsg_configuration = {
    source_address_prefixes      = ["*"]
    source_address_prefixes_name = "All"
  }

  private_endpoint_config = {
      enabled = true
{% if cosmosdb_account_database_type == "mongo" %}
    private_dns_zone_mongo_ids = [data.azurerm_private_dns_zone.privatelink_mongo_cosmos_azure_com.id]
    service_connection_name_mongo = "${local.project}-${local.domain}-cosmos-mongo-endpoint"
    name_mongo = "${local.project}-${local.domain}-cosmos-mongo-endpoint"
{% endif %}
{% if cosmosdb_account_database_type == "sql" %}
    private_dns_zone_sql_ids = [data.azurerm_private_dns_zone.privatelink_documents_azure_com.id]
    name_sql = "${local.project}-${local.domain}-cosmos-sql-endpoint"
{% endif %}


  }


  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}


resource "azurerm_key_vault_secret" "cosmos_{{domain_name_short_snake}}_pkey" {
  name         = "${local.domain}-${var.env_short}-cosmos-pkey"
  value        = module.cosmos.primary_key
  content_type = "text/plain"

  key_vault_id = data.azurerm_key_vault.domain_kv.id
}
