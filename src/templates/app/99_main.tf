terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.16"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.1.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "<= 3.2.3"
    }
{% if include_kubernetes %}
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "<= 2.33.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "<= 2.16.0"
    }
{% endif %}
  }

  backend "azurerm" {}
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = false
    }
  }
}

data "azurerm_subscription" "current" {}

data "azurerm_client_config" "current" {}

{% if include_kubernetes %}
provider "kubernetes" {
  config_path = "${var.k8s_kube_config_path_prefix}/config-${local.aks_name}"
}

provider "helm" {
  kubernetes {
    config_path = "${var.k8s_kube_config_path_prefix}/config-${local.aks_name}"
  }
}
{% endif %}
module "__v4__" {
  source = "git::https://github.com/pagopa/terraform-azurerm-v4?ref={{terraform_module_v4_hash}}"
}
