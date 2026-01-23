resource "azurerm_resource_group" "{{app_service_webapp_name_snake}}_rg" {
  name     = "${local.project}-{{app_service_webapp_name_kebab}}-rg"
  location = var.location

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}

module "{{app_service_webapp_name_snake}}_app_service" {
  source              = "./.terraform/modules/__v4__/IDH/app_service_webapp"
  env                 = var.env
  idh_resource_tier   = var.{{app_service_webapp_name_snake}}_plan_idh_tier
  location            = var.location
  name                = "${local.project_short}-{{app_service_webapp_name_kebab}}-wa"
  product_name        = local.prefix
  resource_group_name = azurerm_resource_group.{{app_service_webapp_name_snake}}_rg.name

  app_service_plan_name = "${local.project}-{{app_service_webapp_name_kebab}}-plan"
  app_settings = {
    # FIXME add your app settings here
  }

  docker_image        = var.{{app_service_webapp_name_snake}}_image.docker_image
  docker_image_tag    = var.{{app_service_webapp_name_snake}}_image.docker_image_tag
  docker_registry_url = var.{{app_service_webapp_name_snake}}_image.docker_registry_url

  tags                = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

  # which subnet is allowed to reach this app service
  allowed_subnet_ids = []


  private_endpoint_dns_zone_id = {% if is_dev_public %} var.env_short == "d" ? null : data.azurerm_private_dns_zone.azurewebsites[0].id{% else %}data.azurerm_private_dns_zone.azurewebsites.id{% endif %}

  embedded_subnet = {
    enabled      = true
    vnet_name    = local.spoke_compute_vnet_name
    vnet_rg_name = local.spoke_compute_vnet_resource_group_name
  }

  # fixme configure the cidr list and service name allowed on this function
  embedded_nsg_configuration = {
    source_address_prefixes      = ["*"]
    source_address_prefixes_name = "All"
    target_ports                 = ["*"]
    protocol                     = "Tcp"
  }

  autoscale_settings = var.{{app_service_webapp_name_snake}}_autoscale_settings

  always_on  = var.{{app_service_webapp_name_snake}}_always_on
}