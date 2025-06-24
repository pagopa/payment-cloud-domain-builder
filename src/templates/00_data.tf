data "azurerm_key_vault" "key_vault" {
  name                = "${local.product}-${var.location_short}-${var.domain}-kv"
  resource_group_name = "${local.product}-${var.location_short}-${var.domain}-sec-rg"
}

data "azurerm_virtual_network" "vnet" {
  name                = local.vnet_name
  resource_group_name = local.vnet_resource_group_name
}

data "azurerm_resource_group" "rg_vnet" {
  name = local.vnet_resource_group_name
}
