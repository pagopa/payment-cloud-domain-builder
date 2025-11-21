module "{{app_service_webapp_name_snake}}_app_service" {
  source              = "./.terraform/modules/__v4__/IDH/app_service_webapp"
  env                 = var.env
  idh_resource_tier   = var.{{app_service_webapp_name_snake}}_plan_idh_tier
  location            = var.location
  name                = "${local.project}-{{app_service_webapp_name_kebab}}-webapp"
  product_name        = local.prefix
  resource_group_name = local.{{app_service_webapp_name_snake}}_rg_name

  app_service_plan_name = "${local.project}-{{app_service_webapp_name_kebab}}-plan"
  app_settings = {
    # FIXME add your app settings here
  }

  docker_image        = var.{{app_service_webapp_name_snake}}_image.docker_image
  docker_image_tag    = var.{{app_service_webapp_name_snake}}_image.docker_tag
  docker_registry_url = var.{{app_service_webapp_name_snake}}_image.docker_registry_url

  subnet_id           = data.azurerm_subnet.{{app_service_webapp_name_snake}}_snet.id
  tags                = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

  # which subnet is allowed to reach this app service
  allowed_subnet_ids = []


  private_endpoint_dns_zone_id = {% if is_dev_public %} var.env_short == "d" ? null : data.azurerm_private_dns_zone.azurewebsites.id{% else %}data.azurerm_private_dns_zone.azurewebsites.id{% endif %}
  private_endpoint_subnet_id   = {% if is_dev_public %} var.env_short == "d" ? null : data.azurerm_subnet.private_endpoint_subnet.id{% else %}data.azurerm_subnet.private_endpoint_subnet.id{% endif %}

  autoscale_settings = var.{{app_service_webapp_name_snake}}_autoscale_settings

  always_on  = var.{{app_service_webapp_name_snake}}_always_on
}