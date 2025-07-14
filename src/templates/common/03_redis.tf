resource "azurerm_resource_group" "redis_rg" {
  name     = "${local.project}-redis-rg"
  location = var.location

  # tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

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

module "redis" {
  source = "./.terraform/modules/__v4__/IDH/redis"

  env = var.env
  idh_resource_tier = "basic"
  product_name = local.prefix

  location = var.location
  name = "${local.project}-redis"
  resource_group_name = azurerm_resource_group.redis_rg.name
  alert_action_group_ids = concat([data.azurerm_monitor_action_group.email.id, data.azurerm_monitor_action_group.slack.id], var.alert_use_opsgenie ? [] : [])

  private_endpoint = {
    subnet_id            = data.azurerm_subnet.private_endpoint_subnet.id
    private_dns_zone_ids = [data.azurerm_private_dns_zone.privatelink_redis_cache_windows_net.id]
  }

  patch_schedules = [
    {
      day_of_week    = "Sunday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Monday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Tuesday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Wednesday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Thursday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Friday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Saturday"
      start_hour_utc = 23
    }
  ]

  # tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

}

resource "azurerm_key_vault_secret" "redis_{{domain_name}}_access_key" {
  name         = "redis-{{domain_name}}-access-key"
  value        = module.redis.primary_access_key
  key_vault_id = data.azurerm_key_vault.domain_kv.id
}

resource "azurerm_key_vault_secret" "redis_{{domain_name}}_hostname" {
  name         = "redis-{{domain_name}}-hostname"
  value        = module.redis.hostname
  key_vault_id = data.azurerm_key_vault.domain_kv.id
}

resource "azurerm_key_vault_secret" "redis_{{domain_name}}_connection_string" {
  name         = "redis-{{domain_name}}-hostname"
  value        = module.redis.primary_connection_string
  key_vault_id = data.azurerm_key_vault.domain_kv.id
}