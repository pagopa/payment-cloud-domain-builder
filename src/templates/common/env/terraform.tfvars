prefix         = "{{product_name}}"
env_short      = "d"
env            = "dev"
domain         = "{{domain_name}}"
location       = "{{location}}"
location_short = "{{location_mapping[location]}}"



external_domain          =  "{{external_domain}}"
dns_zone_internal_prefix = "{{dns_zone_internal_prefix}}"


### Aks
{% if include_kubernetes %}
ingress_load_balancer_ip = "{{ingress_load_balancer_ip}}"
{% endif %}


{% if include_postgresql %}
pgres_flex_params = {
  idh_resource = "pgflex2"
  sku_name     = "GP_Standard_D2ds_v4"
  db_version   = "16"
  # Possible values are 32768, 65536, 131072, 262144, 524288, 1048576,
  # 2097152, 4194304, 8388608, 16777216, and 33554432.
  storage_mb                             = 32768
  zone                                   = 1
  backup_retention_days                  = 7
  geo_redundant_backup_enabled           = false
  create_mode                            = "Default"
  pgres_flex_private_endpoint_enabled    = false
  pgres_flex_ha_enabled                  = false
  pgres_flex_pgbouncer_enabled           = true
  standby_availability_zone              = 2
  pgres_flex_diagnostic_settings_enabled = false
  alerts_enabled                         = false
  max_connections                        = 1000
  pgbouncer_min_pool_size                = 1
  max_worker_process                     = 16
  wal_level                              = "logical"
  shared_preoload_libraries              = "pg_failover_slots"
  public_network_access_enabled          = true
}

pgres_flex_db_names = [
# FIXME add here tour database names
]

custom_metric_alerts = {
  cpu_percent = {
    frequency        = "PT5M"
    window_size      = "PT30M"
    metric_namespace = "Microsoft.DBforPostgreSQL/flexibleServers"
    aggregation      = "Average"
    metric_name      = "cpu_percent"
    operator         = "GreaterThan"
    threshold        = 80
    severity         = 2
  },
  memory_percent = {
    frequency        = "PT5M"
    window_size      = "PT30M"
    metric_namespace = "Microsoft.DBforPostgreSQL/flexibleServers"
    aggregation      = "Average"
    metric_name      = "memory_percent"
    operator         = "GreaterThan"
    threshold        = 80
    severity         = 2
  },
  storage_percent = {
    frequency        = "PT5M"
    window_size      = "PT30M"
    metric_namespace = "Microsoft.DBforPostgreSQL/flexibleServers"
    aggregation      = "Average"
    metric_name      = "storage_percent"
    operator         = "GreaterThan"
    threshold        = 80
    severity         = 2
  },
  active_connections = {
    frequency        = "PT5M"
    window_size      = "PT30M"
    metric_namespace = "Microsoft.DBforPostgreSQL/flexibleServers"
    aggregation      = "Average"
    metric_name      = "active_connections"
    operator         = "GreaterThan"
    threshold        = 1000
    severity         = 2
  },
  connections_failed = {
    frequency        = "PT5M"
    window_size      = "PT30M"
    metric_namespace = "Microsoft.DBforPostgreSQL/flexibleServers"
    aggregation      = "Total"
    metric_name      = "connections_failed"
    operator         = "GreaterThan"
    threshold        = 50
    severity         = 2
  }
}
{% endif %}

