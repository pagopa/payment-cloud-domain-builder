export default {
  fields: [
    {
      name: 'aks_name',
      label: 'AKS cluster name',
      type: 'string',
      placeholder: 'e.g. ${local.prefix}-${var.env_short}-${var.location_short}-${var.env}-aks'
    },
    {
      name: 'aks_rg_name',
      label: 'AKS cluster resource group name',
      type: 'string'
    },
    {
      name: 'ingress_load_balancer_ip',
      label: 'AKS cluster ingress load balancer ip address',
      type: 'string'
    }
  ],
  description: 'Kubernetes configuration'
}