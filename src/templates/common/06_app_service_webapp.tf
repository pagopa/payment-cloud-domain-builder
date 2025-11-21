resource "azurerm_resource_group" "{{app_service_webapp_name_snake}}_rg" {
  name     = "${local.project}-{{app_service_webapp_name_kebab}}-rg"
  location = var.location

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}


# {{app_service_webapp_name}} webapp subnet
module "{{app_service_webapp_name_snake}}_snet" {
  source               = "./.terraform/modules/__v4__/IDH/subnet"
  name                 = "${local.project}-{{app_service_webapp_name_kebab}}-snet"
  resource_group_name  = data.azurerm_resource_group.rg_vnet.name
  virtual_network_name = data.azurerm_virtual_network.vnet.name
  env                = var.env
  idh_resource_tier  = "app_service"
  product_name       = local.prefix

  service_endpoints = ["Microsoft.Web"]
}
