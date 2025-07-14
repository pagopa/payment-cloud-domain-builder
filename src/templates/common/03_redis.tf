resource "azurerm_resource_group" "redis_rg" {
  name     = "${local.project}-redis-rg"
  location = var.location

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

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

{% if is_dev_public %}
  private_endpoint = var.env_short != "d" ? {
    subnet_id            = data.azurerm_subnet.private_endpoint_subnet[0].id
    private_dns_zone_ids = [data.azurerm_private_dns_zone.privatelink_redis_cache_windows_net[0].id]
  } : null
{% else %}
  private_dns_zone_id = {
    subnet_id            = data.azurerm_subnet.private_endpoint_subnet.id
    private_dns_zone_ids = [data.azurerm_private_dns_zone.privatelink_redis_cache_windows_net.id]
  }
{% endif %}

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

  tags = {% if include_tag_config %}module.tag_config.tags{% else %}{{ tag_source }}{% endif %}

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