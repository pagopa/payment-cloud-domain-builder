prefix         = "{{product_name}}"
env_short      = "d"
env            = "dev"
location       = "{{location}}"
location_short = "{{location_mapping[location]}}"
location_string = "{{location_string_mapping[location]}}"


external_domain          =  "{{external_domain}}"
dns_zone_internal_prefix = "{{dns_zone_internal_prefix}}"
dns_zone_prefix          = "{{domain_name}}.{{location_mapping[location]}}"

{% if include_app_service_webapp %}
{{app_service_webapp_name_snake}}_plan_idh_tier = "basic"
{{app_service_webapp_name_snake }}_autoscale_settings = {
    max_capacity                  = 1
    scale_up_requests_threshold   = 250
    scale_down_requests_threshold = 150
}
{{app_service_webapp_name_snake }}_image = {
    docker_image         = "{{app_service_webapp_docker_image}}"
    docker_tag           = "latest"
    docker_registry_url  = "https://index.docker.io"
}
{{app_service_webapp_name_snake }}_always_on = true

{% endif %}

{% if include_app_service_function %}
{{app_service_function_name_snake}}_plan_idh_tier = "basic"
{{app_service_function_name_snake }}_autoscale_settings = {
  max_capacity                  = 1
  scale_up_requests_threshold   = 250
  scale_down_requests_threshold = 150
}
{{app_service_function_name_snake }}_image = {
  docker_image         = "{{app_service_webapp_docker_image}}"
  docker_tag           = "latest"
  docker_registry_url  = "https://index.docker.io"
}
{{app_service_function_name_snake }}_always_on = true

{% endif %}