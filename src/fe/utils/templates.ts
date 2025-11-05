import {
  FaCloud,
  FaDatabase,
  FaMicrosoft,
  FaNetworkWired,
  FaLock,
  FaGithub,
  FaDocker
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiRedis,
} from 'react-icons/si';
import { MdStorage } from 'react-icons/md';
import { AiOutlineDatabase } from "react-icons/ai";
import { VscAzureDevops, VscAzure } from "react-icons/vsc";


export const COMPONENT_CONFIG = {
  apim: {
    icon: FaNetworkWired,
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
    color: "text-black-400"
  },
  cosmos: {
    icon: AiOutlineDatabase,
    label: 'Cosmos DB',
    title: 'Cosmos DB',
    color: "text-green-400"
  },
  cosmosdb: {
    icon: AiOutlineDatabase,
    label: 'Cosmos DB',
    title: 'Cosmos DB',
    color: "text-green-400"
  },
  storage_account: {
    icon: MdStorage,
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
  aks: {
    icon: SiKubernetes,
    label: 'AKS',
    title: 'AKS',
    color: "text-blue-600"
  },
  tag_config: {
    icon: FaCloud,
    label: 'Tag Config',
    title: 'Tag Configuration',
    color: "text-red-200"
  }
} as const;


export const templatesConfig = [
    {
        name: 'pagoPA basic ITN domain',
        description: 'Setup per dominio pagoPA basato in Italy North con risorse base. Include riferimenti APIM, AKS e CI/CD',
        icon: VscAzure,
        template: {
            "location_mapping": {},
            "location_string_mapping": {},
            "domain_name": "",
            "is_dev_public": false,
            "storage_account_state_name": "tfinfdevpagopa",
            "storage_account_container_state_name": "terraform-state",
            "storage_account_state_rg_name": "terraform-state-rg",
            "subscription": "DEV-pagoPA",
            "product_name": "pagopa",
            "location": "italynorth",
            "tag_source": false,
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
            "include_cosmos": false,
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
            "ingress_load_balancer_ip": "10.3.2.250",
            "include_storage_account": false,
            "storage_account_scope_name": "",
            "storage_account_data_types": "",
            "include_redis": false,
            "include_postgresql": false
        }
    },
    {
        name: 'pagoPA basic WEU domain',
        description: 'Setup per dominio pagoPA basato in West Europe con risorse base. Include riferimenti APIM, AKS e CI/CD',
        icon: VscAzure,
        template: {
            "location_mapping": {},
            "location_string_mapping": {},
            "domain_name": "",
            "is_dev_public": false,
            "storage_account_state_name": "tfinfdevpagopa",
            "storage_account_container_state_name": "terraform-state",
            "storage_account_state_rg_name": "terraform-state-rg",
            "subscription": "DEV-pagoPA",
            "product_name": "pagopa",
            "location": "westeurope",
            "tag_source": false,
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
            "include_cosmos": false,
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
            "ingress_load_balancer_ip": "10.1.100.250",
            "include_storage_account": false,
            "storage_account_scope_name": "",
            "storage_account_data_types": "",
            "include_redis": false,
            "include_postgresql": false
        }
    },
    {
        name: 'test template',
        description: 'prova',
        icon: VscAzure,
        template: {
            "location_mapping": {},
            "location_string_mapping": {},
            "domain_name": "",
            "is_dev_public": true,
            "storage_account_state_name": "",
            "storage_account_container_state_name": "terraform-state",
            "storage_account_state_rg_name": "terraform-state-rg",
            "subscription": "",
            "product_name": "pagopa",
            "location": "westeurope",
            "tag_source": "",
            "application_insight_name": "${local.prefix}-${var.env_short}-${local.domain}-${local.product}-appinsight",
            "log_analytics_ws_name": "${local.prefix}-${var.env_short}-${local.domain}-${local.product}-law",
            "log_analytics_ws_rg_name": "${local.prefix}-${var.env_short}-${local.domain}-${local.product}-law-rg",
            "monitor_rg_name": "${local.prefix}-${var.env_short}-${local.domain}-${local.product}-monitoring-rg",
            "monitor_action_group_slack_name": "SlackMeme",
            "monitor_action_group_email_name": "memeproduct",
            "monitor_action_group_opsgenie_name": "memeOpsgenie",
            "vnet_name": "vnet",
            "vnet_rg_name": "vnet-rg",
            "private_endpoint_subnet_name": "private-endpt",
            "private_endpoint_subnet_rg_name": "private-dns-rg",
            "private_endpoint_subnet_vnet_name": "${local.prefix}-${var.env_short}-vnet",
            "private_dns_zone_rg_name": "dns-vnet-rg",
            "external_domain": "meme.pagopa.it",
            "internal_dns_zone_resource_group_name": "dns-zone-rg",
            "dns_zone_internal_prefix": "internal-prefix",
            "include_devops": false,
            "azdo_managed_identity_rg_name": "",
            "azdo_managed_identity_iac_prefix": "",
            "include_apim": true,
            "apim_name": "apim-nome",
            "apim_rg_name": "${local.prefix}-${var.env_short}-api-rg",
            "include_cosmos": false,
            "cosmosdb_account_database_type": "",
            "include_github_runner": true,
            "gh_runner_cae_name": "${local.prefix}-${var.env_short}",
            "gh_runner_cae_rg": "${local.prefix}-${var.env_short}-tools-rg",
            "gh_runner_pat_key": "${local.prefix}-${var.env_short}-job-pat",
            "gh_runner_pat_kv_name": "${local.prefix}-${var.env_short}-kv",
            "gh_runner_pat_kv_rg": "${local.prefix}-${var.env_short}-sec-rg",
            "include_aks": false,
            "aks_name": "${local.prefix}-${var.env_short}-${var.location_short}-${local.project}-aks",
            "aks_rg_name": "${local.prefix}-${var.env_short}-${var.location_short}-${local.project}-aks-rg",
            "ingress_load_balancer_ip": "10.1.100.250",
            "include_storage_account": true,
            "storage_account_scope_name": "myscope",
            "storage_account_data_types": [
                "blob"
            ],
            "include_redis": true,
            "include_postgresql": false,
            "include_tag_config": false,
            "include_kubernetes": true,
            "include_cosmosdb": false,
            "azure_devops_rg_name": "identity-rg",
            "azure_devops_iac_prefix": "azdo-iac"
        }

    }
]