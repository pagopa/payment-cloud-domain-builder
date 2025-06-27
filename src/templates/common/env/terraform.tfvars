prefix         = "{{product_name}}"
env_short      = "d"
env            = "dev"
domain         = "{{domain_name}}"
location       = "{{location}}"
location_short = "{{location_mapping[location]}}"



external_domain          =  "{{external_domain}}"
dns_zone_internal_prefix = "{{dns_zone_internal_prefix}}"

alert_use_opsgenie = false

### Aks
{% if include_kubernetes %}
ingress_load_balancer_ip = "{{ingress_load_balancer_ip}}"
{% endif %}


{% if include_postgresql %}
pgres_flex_params = {
  idh_resource_tier = "pgflex2"
  db_version        = "16"
  pgres_flex_diagnostic_settings_enabled = false
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

