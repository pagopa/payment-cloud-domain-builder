locals {
  tools_cae_name = "${local.product}-${var.location_short}-core-tools-cae"
  tools_cae_rg   = "${local.product}-${var.location_short}-core-tools-rg"
}

module "gh_runner_job" {
  source = "./.terraform/modules/__v4__/gh_runner_container_app_job_domain_setup"

  domain_name        = local.domain
  env_short          = var.env_short
  environment_name   = local.tools_cae_name
  environment_rg     = local.tools_cae_rg
  gh_identity_suffix = "job-01"
  gh_env             = var.env
  runner_labels      = ["self-hosted-job", "${var.env}"]
  # FIXME: configure here the repositories to be used by the job
  gh_repositories = [

  ]
  job = {
    name = local.domain
  }
  job_meta = {}
  key_vault = {
    name        = "${local.product}-kv"     # Name of the KeyVault which stores PAT as secret
    rg          = "${local.product}-sec-rg" # Resource group of the KeyVault which stores PAT as secret
    secret_name = "gh-runner-job-pat"       # Data of the KeyVault which stores PAT as secret
  }

{% if include_kubernetes %}
  kubernetes_deploy = {
    enabled      = true
    namespaces   = [kubernetes_namespace.namespace.metadata[0].name]
    cluster_name = local.aks_name
    rg           = local.aks_rg_name
  }
{% else %}
  kubernetes_deploy = {
      enabled      = false
      namespaces   = []
      cluster_name = ""
      rg           = ""
  }
{% endif %}

  location                = var.location
  prefix                  = local.prefix
  resource_group_name     = data.azurerm_resource_group.identity_rg.name
  domain_security_rg_name = "${local.project}-sec-rg"
  tags                    = module.tag_config.tags

}
