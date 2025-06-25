resource_group_name  = "terraform-state-rg"
storage_account_name = "{{ storage_account_state_name }}"
container_name       = "{{ storage_account_container_state_name }}"
key                  = "{{ domain_name }}-secrets-dev.terraform.tfstate"
