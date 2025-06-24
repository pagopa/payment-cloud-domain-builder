locals {
  domain        = "{{domain_name}}"
  prefix       = "{{product_name}}"
  project = "${var.prefix}-${var.env_short}-${var.location_short}-${local.domain}"
  product = "${var.prefix}-${var.env_short}"


  subscription_name = "${var.env}-${var.prefix}"

  azdo_managed_identity_rg_name = "{{ azdo_managed_identity_rg_name }}"
  azdo_iac_managed_identities   = toset(["{{azdo_managed_identity_iac_prefix }}-deploy", "{{azdo_managed_identity_iac_prefix }}-plan"])

}
