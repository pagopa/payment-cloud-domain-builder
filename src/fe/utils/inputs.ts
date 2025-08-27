export const formConfig = {
  steps: {
    domain: {
      default: true,
      formFields: [
        { name: "Domain Name", type: "text", placeholder: "e.g. meme" },
        { name: "Is Dev Public", type: "checkbox", placeholder: "Enable public access in dev?" },
        { name: "Storage Account State Name", type: "text", placeholder: "e.g. tfinfdevpagopa" },
        { name: "Storage Account Container State Name", type: "text", placeholder: "e.g. terraform-state" },
        { name: "Storage Account State RG Name", type: "text", placeholder: "e.g. terraform-state-rg" },
        { name: "Subscription", type: "text", placeholder: "e.g. DEV-PagoPA" },
        { name: "Product Name", type: "text", placeholder: "e.g. pagopa" },
        { name: "Location", type: "text", placeholder: "e.g. westeurope" },
      ],
    },
    monitoring: {
      default: true,
      formFields: [
        { name: "Application Insight Name", type: "text", placeholder: "e.g. appinsights name" },
        { name: "Log Analytics Workspace Name", type: "text", placeholder: "e.g. law name" },
        { name: "Log Analytics Workspace RG Name", type: "text", placeholder: "e.g. law resource group" },
        { name: "Monitor RG Name", type: "text", placeholder: "e.g. monitor resource group" },
        { name: "Slack Action Group Name", type: "text", placeholder: "e.g. SlackPagoPA" },
        { name: "Email Action Group Name", type: "text", placeholder: "e.g. PagoPA" },
        { name: "Opsgenie Action Group Name", type: "text", placeholder: "e.g. Opsgenie" },
      ],
    },
    networking: {
      default: true,
      formFields: [
        { name: "VNet Name", type: "text", placeholder: "e.g. vnet" },
        { name: "VNet RG Name", type: "text", placeholder: "e.g. vnet-rg" },
        { name: "Private Endpoint Subnet Name", type: "text", placeholder: "e.g. private-endpoint-snet" },
        { name: "Private Endpoint Subnet RG Name", type: "text", placeholder: "e.g. vnet-rg" },
        { name: "Private DNS Zone RG Name", type: "text", placeholder: "e.g. vnet-rg" },
        { name: "External Domain", type: "text", placeholder: "e.g. pagopa.it" },
        { name: "Internal DNS Zone Resource Group Name", type: "text", placeholder: "e.g. dns zone rg" },
        { name: "DNS Zone Internal Prefix", type: "text", placeholder: "e.g. internal" },
      ],
    },
    devops: {
      default: false,
      formFields: [
        { name: "Azure DevOps RG Name", type: "text", placeholder: "e.g. identity-rg" },
        { name: "Azure DevOps IAC Prefix", type: "text", placeholder: "e.g. azdo-iac" },
      ],
    },
    apim: {
      default: false,
      formFields: [
        { name: "APIM Name", type: "text", placeholder: "e.g. apim name" },
        { name: "APIM RG Name", type: "text", placeholder: "e.g. apim-rg" },
        { name: "APIM SKU", type: "text", placeholder: "e.g. apim-sku" },
      ],
    },
    cosmos_db: {
      default: false,
      formFields: [
        { name: "CosmosDB Account Database Type", type: "text", placeholder: "e.g. mongo or sql" },
      ],
    },
    github_runner: {
      default: false,
      formFields: [
        { name: "GitHub Runner CAE Name", type: "text", placeholder: "e.g. tools-cae" },
        { name: "GitHub Runner RG", type: "text", placeholder: "e.g. tools-rg" },
        { name: "GitHub Runner PAT Key", type: "text", placeholder: "e.g. gh-runner-job-pat" },
        { name: "GitHub Runner PAT KV Name", type: "text", placeholder: "e.g. kv name" },
        { name: "GitHub Runner PAT KV RG", type: "text", placeholder: "e.g. sec-rg" },
      ],
    },
    kubernetes: {
      default: false,
      formFields: [
        { name: "AKS Name", type: "text", placeholder: "e.g. aks name" },
        { name: "AKS RG Name", type: "text", placeholder: "e.g. aks resource group" },
        { name: "Ingress Load Balancer IP", type: "text", placeholder: "e.g. 10.1.100.250" },
      ],
    },
    storage_account: {
      default: false,
      formFields: [
        { name: "Storage Account Scope Name", type: "text", placeholder: "e.g. myscope" },
        { name: "Storage Account Data Types", type: "checkbox", options: ["blob", "queue"] },
      ],
    },
    event_hub: {
      default: false,
      formFields: [
        { name: "Evh name", type: "text", placeholder: "e.g. myscope" },
        { name: "Evh RG", type: "text", placeholder: "e.g. evh rg here"},
      ],
    },
  },
};