import {
    FaCloud,
    FaDatabase,
    FaGithub,
    FaTags,
} from 'react-icons/fa';
import {
    AzAppServiceWebApp, APIManagement,
    CosmosDBcolor,
    AzStoragecs, AzFunctionsColor
} from 'azure-react-icons';
import {
    SiKubernetes,
    SiRedis,
} from 'react-icons/si';
import { VscAzureDevops, VscAzure } from "react-icons/vsc";


export const COMPONENT_CONFIG = {
    apim: {
        icon: APIManagement,
        label: 'APIM',
        title: 'apim',
        color: "text-blue-300"
    },
    kubernetes: {
        icon: SiKubernetes,
        label: 'AKS',
        title: 'kubernetes',
        color: "text-blue-600"
    },
    devops: {
        icon: VscAzureDevops,
        label: 'DevOps',
        title: 'DevOps',
        color: "text-blue-400"
    },
    github_runner: {
        icon: FaGithub,
        label: 'GitHub Runner',
        title: 'GitHub',
        color: "text-zinc-600 dark:text-zinc-300"
    },
    cosmos: {
        icon: CosmosDBcolor,
        label: 'Cosmos DB',
        title: 'Cosmos DB',
        color: "text-green-400"
    },
    cosmosdb: {
        icon: CosmosDBcolor,
        label: 'Cosmos DB',
        title: 'Cosmos DB',
        color: "text-green-400"
    },
    storage_account: {
        icon: AzStoragecs,
        label: 'Storage Account',
        title: 'Storage Account',
        color: "text-zinc-400"
    },
    redis: {
        icon: SiRedis,
        label: 'Redis',
        title: 'Redis',
        color: "text-red-400"
    },
    postgresql: {
        icon: FaDatabase,
        label: 'PostgreSQL',
        title: 'PostgreSQL',
        color: "text-blue-800"
    },
    app_service_webapp: {
        icon: AzAppServiceWebApp,
        label: 'Webapp',
        title: 'App Service Webapp',
        color: "text-blue-800"
    },
    app_service_function: {
        icon: AzFunctionsColor,
        label: 'Function',
        title: 'App Service Function',
        color: "text-blue-800"
    },
    tag_config: {
        icon: FaTags,
        label: 'Tag Config',
        title: 'Tag config',
        color: "text-zinc-600 dark:text-zinc-300"
    }
} as const;


export const templatesConfig = [
    {
        name: 'pagoPA basic ITN domain',
        description: 'Setup per dominio pagoPA basato in Italy North con risorse base. Include riferimenti APIM, AKS e CI/CD',
        icon: VscAzure,
        template: {
            "domain_name": "",
            "is_dev_public": true,
            "storage_account_state_name": "tfinfdevpagopa",
            "storage_account_container_state_name": "terraform-state",
            "storage_account_state_rg_name": "terraform-state-rg",
            "subscription": "DEV-pagoPA",
            "product_name": "pagopa",
            "location": "italynorth",
            "tag_source": false,
            "include_tag_config": true,
            "application_insight_name": "${local.product}-${var.location_short}-core-appinsights",
            "log_analytics_ws_name": "${local.product}-${var.location_short}-core-law",
            "log_analytics_ws_rg_name": "${local.product}-${var.location_short}-core-monitor-rg",
            "monitor_rg_name": "${local.product}-${var.location_short}-core-monitor-rg",
            "monitor_action_group_slack_name": "SlackPagoPA",
            "monitor_action_group_email_name": "PagoPA",
            "monitor_action_group_opsgenie_name": "Opsgenie",
            "vnet_name": "${local.product}-${var.location_short}-vnet",
            "vnet_rg_name": "${local.product}-${var.location_short}-vnet-rg",
            "private_endpoint_subnet_name": "${local.product}-common-private-endpoint-snet",
            "private_endpoint_subnet_rg_name": "${local.product}-${var.location_short}-vnet-rg",
            "private_endpoint_subnet_vnet_name": "${local.product}-${var.location_short}-vnet",
            "private_dns_zone_rg_name": "${local.product}-vnet-rg",
            "external_domain": "pagopa.it",
            "internal_dns_zone_resource_group_name": "${local.product}-vnet-rg",
            "dns_zone_internal_prefix": "internal.dev.platform",
            "include_devops": true,
            "azdo_managed_identity_rg_name": "${local.product}-identity-rg",
            "azdo_managed_identity_iac_prefix": "azdo-${var.env}-${local.prefix}-iac",
            "include_apim": true,
            "apim_name": "${local.product}-apim",
            "apim_rg_name": "${local.product}-api-rg",
            "include_cosmosdb": false,
            "cosmosdb_account_database_type": "",
            "include_github_runner": true,
            "gh_runner_cae_name": "${local.product}-${var.location_short}-core-tools-cae",
            "gh_runner_cae_rg": "${local.product}-${var.location_short}-core-tools-rg",
            "gh_runner_pat_key": "pagopa-platform-domain-github-bot-cd-pat",
            "gh_runner_pat_kv_name": "${local.project}-kv",
            "gh_runner_pat_kv_rg": "${local.project}-sec-rg",
            "include_kubernetes": true,
            "aks_name": "${local.product}-${var.location_short}-${var.env}-aks",
            "aks_rg_name": "${local.product}-${var.location_short}-${var.env}-aks-rg",
            "include_redis": false,
            "include_postgresql": false,
            "include_storage_account": false
           }
    },
    {
        name: 'pagoPA basic WEU domain',
        description: 'Setup per dominio pagoPA basato in West Europe con risorse base. Include riferimenti APIM, AKS e CI/CD',
        icon: VscAzure,
        template: {
            "domain_name": "",
            "is_dev_public": true,
            "storage_account_state_name": "tfinfdevpagopa",
            "storage_account_container_state_name": "terraform-state",
            "storage_account_state_rg_name": "terraform-state-rg",
            "subscription": "DEV-pagoPA",
            "product_name": "pagopa",
            "location": "westeurope",
            "tag_source": false,
            "include_tag_config": true,
            "application_insight_name": "${local.product}-appinsights",
            "log_analytics_ws_name": "${local.product}-law",
            "log_analytics_ws_rg_name": "${local.product}-monitor-rg",
            "monitor_rg_name": "${local.product}-monitor-rg",
            "monitor_action_group_slack_name": "SlackPagoPA",
            "monitor_action_group_email_name": "PagoPA",
            "monitor_action_group_opsgenie_name": "Opsgenie",
            "vnet_name": "${local.product}-vnet",
            "vnet_rg_name": "${local.product}-vnet-rg",
            "private_endpoint_subnet_name": "${local.product}-common-private-endpoint-snet",
            "private_endpoint_subnet_rg_name": "${local.product}-vnet-rg",
            "private_endpoint_subnet_vnet_name": "${local.product}-vnet",
            "private_dns_zone_rg_name": "${local.product}-vnet-rg",
            "external_domain": "pagopa.it",
            "internal_dns_zone_resource_group_name": "${local.product}-vnet-rg",
            "dns_zone_internal_prefix": "internal.dev.platform",
            "include_devops": true,
            "azdo_managed_identity_rg_name": "${local.product}-identity-rg",
            "azdo_managed_identity_iac_prefix": "azdo-${var.env}-${local.prefix}-iac",
            "include_apim": true,
            "apim_name": "${local.product}-apim",
            "apim_rg_name": "${local.product}-api-rg",
            "include_cosmosdb": false,
            "cosmosdb_account_database_type": "",
            "include_github_runner": true,
            "gh_runner_cae_name": "${local.product}-tools-cae",
            "gh_runner_cae_rg": "${local.product}-core-tools-rg",
            "gh_runner_pat_key": "pagopa-platform-domain-github-bot-cd-pat",
            "gh_runner_pat_kv_name": "${local.project}-kv",
            "gh_runner_pat_kv_rg": "${local.project}-sec-rg",
            "include_kubernetes": true,
            "aks_name": "${local.product}-${var.location_short}-${var.env}-aks",
            "aks_rg_name": "${local.product}-${var.location_short}-${var.env}-aks-rg",
            "include_storage_account": false,
            "storage_account_scope_name": "",
            "storage_account_data_types": "",
            "include_redis": false,
            "include_postgresql": false
        }
    },
]