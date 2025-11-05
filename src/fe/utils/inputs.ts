/**
 * Form Configuration Guide
 *
 * To add a new step:
 * 1. Add a new object in the step object with a unique key
 * 2. Set 'default' to true if the step should be shown by default, false otherwise
 * 3. Set 'name' for the display name of the step
 * 4. Add 'formFields' array containing field configurations
 *
 * Field configuration options:
 * - name: Display name of the field
 * - key: Unique identifier for the field
 * - type: Input type ('text', 'boolean', 'select', 'radio', 'hidden')
 * - placeholder: Helper text shown in the input (optional)
 * - value: Default value (optional, true or false not string if type='boolean')
 * - options: Array of {label, value} for select inputs (required for type='select')
 *
 * Example:
 * {
 *   newStep: {
 *     default: false,
 *     name: "Step Name",
 *     formFields: [
 *       {
 *         name: "Field Label",
 *         key: "field_key",
 *         type: "text",
 *         placeholder: "Enter value"
 *       }
 *     ]
 *   }
 * }
 */
export const formConfig = {
  steps: {
    domain: {
      default: true,
      name: "Definizione dominio",
      formFields: [
        { name: "Domain Name", key: "domain_name", type: "text", placeholder: "e.g. meme" },
        { name: "Is Dev Public?", key: "is_dev_public", type: "boolean", placeholder: "Enable public access in dev?" },
        { name: "State Storage Account Name", key: "storage_account_state_name", type: "text", placeholder: "e.g. tfinfdevpagopa" },
        { name: "State Storage Account Container Name", key: "storage_account_container_state_name", type: "text", placeholder: "e.g. terraform-state" },
        { name: "State Storage Account RG Name", key: "storage_account_state_rg_name", type: "text", placeholder: "e.g. terraform-state-rg" },
        { name: "Subscription Name", key: "subscription", type: "text", placeholder: "e.g. DEV-PagoPA" },
        { name: "Product Name", key: "product_name", type: "text", placeholder: "e.g. pagopa" },
        { name: "Location", key: "location", type: "select",
          options: [
            { label: "West Europe", value: "westeurope" },
            { label: "Italy North", value: "italynorth" }
          ]
        },
        { name: "Tag Config", key: "include_tag_config", type: "static", value: "true" },
      ],
    },
    monitoring: {
      default: true,
      name: "Monitoraggio",
      formFields: [
        { name: "Application Insight Name", key: "application_insight_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-itn-core-appinsights" },
        { name: "Log Analytics Workspace Name", key: "log_analytics_ws_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-itn-core-law" },
        { name: "Log Analytics Workspace RG Name", key: "log_analytics_ws_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-itn-core-monitor-rg" },
        { name: "Monitor RG Name", key: "monitor_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-itn-core-monitor-rg" },
        { name: "Slack Action Group Name", key: "monitor_action_group_slack_name", type: "text", placeholder: "e.g. SlackPagoPA" },
        { name: "Email Action Group Name", key: "monitor_action_group_email_name", type: "text", placeholder: "e.g. PagoPA" },
        { name: "Opsgenie Action Group Name", key: "monitor_action_group_opsgenie_name", type: "text", placeholder: "e.g. Opsgenie" },
      ],
    },
    networking: {
      default: true,
      name: "Riferimenti Network",
      formFields: [
        { name: "VNet Name", key: "vnet_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-vnet" },
        { name: "VNet RG Name", key: "vnet_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-vnet-rg" },
        { name: "Private Endpoint Subnet Name", key: "private_endpoint_subnet_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-common-private-endpoint-snet" },
        { name: "Private Endpoint Subnet RG Name", key: "private_endpoint_subnet_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-vnet-rg" },
        { name: "Private Endpoint Subnet Vnet name", key: "private_endpoint_subnet_vnet_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-vnet" },
        { name: "Private DNS Zone RG Name", key: "private_dns_zone_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-vnet-rg" },
        { name: "External Domain", key: "external_domain", type: "text", placeholder: "e.g. pagopa.it" },
        { name: "Internal DNS Zone Resource Group Name", key: "internal_dns_zone_resource_group_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-vnet-rg" },
        { name: "Internal DNS Prefix", key: "dns_zone_internal_prefix", type: "text", placeholder: "e.g. internal.dev.platform" },
      ],
    },
    devops: {
      default: false,
      name: "Riferimenti Agent DevOps",
      formFields: [
        { name: "include_devops", key: "include_devops", type: "hidden", value: "false" },
        { name: "Azure DevOps managed identity RG Name", key: "azdo_managed_identity_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-identity-rg" },
        { name: "Azure DevOps managed identity IAC Prefix", key: "azdo_managed_identity_iac_prefix", type: "text", placeholder: "e.g. azdo-${var.env}-${local.prefix}-iac" },
      ],
    },
    apim: {
      default: false,
      name: "Riferimenti API Management",
      formFields: [
        { name: "include_apim", key: "include_apim", type: "hidden", value: "false" },
        { name: "APIM Name", key: "apim_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-apim" },
        { name: "APIM RG Name", key: "apim_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-api-rg" },
      ],
    },
    cosmos_db: {
      default: false,
      name: "CosmosDB",
      formFields: [
        { name: "include_cosmos", key: "include_cosmos", type: "hidden", value: "false" },
        { name: "CosmosDB Account Database Type", key: "cosmosdb_account_database_type", type: "select",
          options: [
            { label: "Mongo", value: "mongo" },
            { label: "Sql", value: "sql" }
          ]
        },
      ],
    },
    github_runner: {
      default: false,
      name: "GitHub Runner self hosted",
      formFields: [
        { name: "include_github_runner", key: "include_github_runner", type: "hidden", value: "false" },
        { name: "GitHub Runner CAE Name", key: "gh_runner_cae_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-tools-cae" },
        { name: "GitHub Runner RG", key: "gh_runner_cae_rg", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-tools-rg" },
        { name: "GitHub Runner PAT Key", key: "gh_runner_pat_key", type: "text", placeholder: "e.g. gh-runner-job-pat" },
        { name: "GitHub Runner PAT KV Name", key: "gh_runner_pat_kv_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-kv" },
        { name: "GitHub Runner PAT KV RG", key: "gh_runner_pat_kv_rg", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-sec-rg" },
      ],
    },
    kubernetes: {
      default: false,
      name: "Riferimenti AKS",
      formFields: [
        { name: "include_kubernetes", key: "include_kubernetes", type: "hidden", value: "false" },
        { name: "AKS Name", key: "aks_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-${var.location_short}-${var.env}-aks" },
        { name: "AKS RG Name", key: "aks_rg_name", type: "text", placeholder: "e.g. ${local.prefix}-${var.env_short}-${var.location_short}-${var.env}-aks-rg" },
        { name: "Ingress Load Balancer IP", key: "ingress_load_balancer_ip", type: "text", placeholder: "e.g. 10.1.100.250" },
      ],
    },
    storage_account: {
      default: false,
      name: "Storage Account",
      formFields: [
        { name: "include_storage_account", key: "include_storage_account", type: "hidden", value: "false" },
        { name: "Storage Account Scope Name", key: "storage_account_scope_name", type: "text", placeholder: "e.g. myscope" },
        { name: "Storage Account Data Types", key: "storage_account_data_types", type: "checkboxgroup",
          options: [
            { label: "Blob", value: "blob" },
            { label: "DFS", value: "dfs" },
            { label: "File", value: "file" },
            { label: "Web", value: "web" },
            { label: "Table", value: "table" },
            { label: "Queue", value: "queue" }
          ]
        },
      ],
    },
    redis: {
        default: false,
        name: "Redis cluster",
        formFields: [
          { name: "include_redis", key: "include_redis", type: "hidden", value: "false" },
        ]
    },
    postgresql: {
        default: false,
        name: "PostgreSQL database",
        formFields: [
          { name: "include_postgresql", key: "include_postgresql", type: "hidden", value: "false" },
        ]
    }
  },
};