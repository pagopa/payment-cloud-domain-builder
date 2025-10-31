// src/fe/utils/idhModules.ts

export interface IdhModuleField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'boolean';
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
  description?: string;
  placeholder?: string;
}

export interface IdhModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  sourcePath: string;
  fields: IdhModuleField[];
}

export const idhModules: Record<string, IdhModule> = {
  event_hub: {
    id: 'event_hub',
    name: 'Event Hub',
    description: 'Azure Event Hub per streaming di eventi',
    icon: '📡',
    sourcePath: './.terraform/modules/__v4__/IDH/event_hub',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Nome dell\'Event Hub',
        placeholder: 'myeventhub'
      },
      {
        name: 'idh_resource_tier',
        label: 'Resource Tier',
        type: 'select',
        required: true,
        options: ['standard', 'premium', 'basic'],
        defaultValue: 'standard',
        description: 'Tier delle risorse IDH'
      },
      {
        name: 'partition_count',
        label: 'Partition Count',
        type: 'number',
        required: false,
        defaultValue: 2,
        description: 'Numero di partizioni'
      },
      {
        name: 'message_retention',
        label: 'Message Retention (days)',
        type: 'number',
        required: false,
        defaultValue: 1,
        description: 'Giorni di retention messaggi'
      }
    ]
  },
  key_vault: {
    id: 'key_vault',
    name: 'Key Vault',
    description: 'Azure Key Vault per gestione secrets e certificati',
    icon: '🔐',
    sourcePath: './.terraform/modules/__v4__/IDH/key_vault',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Nome del Key Vault (max 24 caratteri)',
        placeholder: 'mykv'
      },
      {
        name: 'idh_resource_tier',
        label: 'Resource Tier',
        type: 'select',
        required: true,
        options: ['standard', 'premium'],
        defaultValue: 'standard',
        description: 'Tier delle risorse IDH'
      },
      {
        name: 'product_name',
        label: 'Product Name',
        type: 'text',
        required: true,
        defaultValue: 'pagopa',
        description: 'Nome del prodotto',
        placeholder: 'pagopa'
      },
      {
        name: 'sku_name',
        label: 'SKU Name',
        type: 'select',
        required: false,
        options: ['standard', 'premium'],
        defaultValue: 'standard',
        description: 'SKU del Key Vault (premium per HSM)'
      },
      {
        name: 'enabled_for_disk_encryption',
        label: 'Enable for Disk Encryption',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Abilita per crittografia dischi'
      },
      {
        name: 'soft_delete_retention_days',
        label: 'Soft Delete Retention (days)',
        type: 'number',
        required: false,
        defaultValue: 90,
        description: 'Giorni di retention per soft delete (7-90)'
      },
      {
        name: 'purge_protection_enabled',
        label: 'Enable Purge Protection',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Protegge dalla cancellazione permanente'
      }
    ]
  },
  subnet: {
    id: 'subnet',
    name: 'Subnet',
    description: 'Azure Subnet per network segmentation',
    icon: '🌐',
    sourcePath: './.terraform/modules/__v4__/IDH/subnet',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Nome della Subnet',
        placeholder: 'mysubnet-snet'
      },
      {
        name: 'idh_resource_tier',
        label: 'Resource Tier',
        type: 'select',
        required: true,
        options: ['postgres_flexible', 'container_apps', 'aks', 'app_service', 'standard'],
        defaultValue: 'standard',
        description: 'Tier per configurazione subnet specifica'
      },
      {
        name: 'product_name',
        label: 'Product Name',
        type: 'text',
        required: true,
        defaultValue: 'pagopa',
        description: 'Nome del prodotto',
        placeholder: 'pagopa'
      },
      {
        name: 'address_prefixes',
        label: 'Address Prefixes',
        type: 'text',
        required: false,
        description: 'CIDR della subnet (es. 10.0.1.0/24)',
        placeholder: '10.0.1.0/24'
      },
      {
        name: 'service_endpoints',
        label: 'Service Endpoints',
        type: 'text',
        required: false,
        description: 'Service endpoints separati da virgola (es. Microsoft.Storage,Microsoft.Sql)',
        placeholder: 'Microsoft.Storage'
      },
      {
        name: 'private_endpoint_network_policies_enabled',
        label: 'Private Endpoint Network Policies',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Abilita policy di rete per private endpoints'
      },
      {
        name: 'private_link_service_network_policies_enabled',
        label: 'Private Link Service Policies',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Abilita policy per private link services'
      }
    ]
  },
  redis: {
    id: 'redis',
    name: 'Redis Cache',
    description: 'Azure Redis Cache per caching e sessioni',
    icon: '🔴',
    sourcePath: './.terraform/modules/__v4__/IDH/redis',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Nome del Redis Cache',
        placeholder: 'myredis'
      },
      {
        name: 'idh_resource_tier',
        label: 'Resource Tier',
        type: 'select',
        required: true,
        options: ['basic', 'standard', 'premium'],
        defaultValue: 'basic',
        description: 'Tier delle risorse IDH'
      },
      {
        name: 'product_name',
        label: 'Product Name',
        type: 'text',
        required: true,
        defaultValue: 'pagopa',
        description: 'Nome del prodotto',
        placeholder: 'pagopa'
      },
      {
        name: 'family',
        label: 'Family',
        type: 'select',
        required: false,
        options: ['C', 'P'],
        defaultValue: 'C',
        description: 'C = Basic/Standard, P = Premium'
      },
      {
        name: 'capacity',
        label: 'Capacity',
        type: 'number',
        required: false,
        defaultValue: 0,
        description: 'Capacità del cache (0-6 per Basic/Standard, 1-5 per Premium)'
      },
      {
        name: 'enable_non_ssl_port',
        label: 'Enable Non-SSL Port',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Abilita porta non SSL (6379)'
      }
    ]
  },
  postgres_flexible_server: {
    id: 'postgres_flexible_server',
    name: 'PostgreSQL Flexible Server',
    description: 'Azure PostgreSQL Flexible Server per database relazionali',
    icon: '🐘',
    sourcePath: './.terraform/modules/__v4__/IDH/postgres_flexible_server',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Nome del PostgreSQL Server',
        placeholder: 'mypostgres'
      },
      {
        name: 'idh_resource_tier',
        label: 'Resource Tier',
        type: 'select',
        required: true,
        options: ['pgflex1', 'pgflex2', 'pgflex3'],
        defaultValue: 'pgflex2',
        description: 'Tier delle risorse IDH (pgflex1=Small, pgflex2=Medium, pgflex3=Large)'
      },
      {
        name: 'product_name',
        label: 'Product Name',
        type: 'text',
        required: true,
        defaultValue: 'pagopa',
        description: 'Nome del prodotto',
        placeholder: 'pagopa'
      },
      {
        name: 'administrator_login',
        label: 'Administrator Login',
        type: 'text',
        required: true,
        description: 'Username amministratore (usa Key Vault secret in produzione)',
        placeholder: 'pgadmin'
      },
      {
        name: 'administrator_password',
        label: 'Administrator Password',
        type: 'text',
        required: true,
        description: '⚠️ Password amministratore (usa Key Vault secret in produzione)',
        placeholder: 'da Key Vault'
      },
      {
        name: 'postgres_version',
        label: 'PostgreSQL Version',
        type: 'select',
        required: false,
        options: ['11', '12', '13', '14', '15', '16'],
        defaultValue: '16',
        description: 'Versione di PostgreSQL'
      },
      {
        name: 'diagnostic_settings_enabled',
        label: 'Enable Diagnostic Settings',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Abilita diagnostica e logging'
      },
      {
        name: 'alerts_enabled',
        label: 'Enable Alerts',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Abilita alerting'
      },
      {
        name: 'geo_replication_enabled',
        label: 'Enable Geo-Replication',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Abilita replica geografica'
      }
    ]
  },
  storage_account: {
    id: 'storage_account',
    name: 'Storage Account',
    description: 'Azure Storage Account per blob, files, tables',
    icon: '💾',
    sourcePath: './.terraform/modules/__v4__/IDH/storage_account',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        description: 'Nome del Cosmos DB',
        placeholder: 'mycosmosdb'
      },
      {
        name: 'idh_resource_tier',
        label: 'Resource Tier',
        type: 'select',
        required: true,
        options: ['standard', 'premium'],
        defaultValue: 'standard',
        description: 'Tier delle risorse IDH'
      },
      {
        name: 'consistency_level',
        label: 'Consistency Level',
        type: 'select',
        required: true,
        options: ['Eventual', 'Session', 'BoundedStaleness', 'Strong', 'ConsistentPrefix'],
        defaultValue: 'Session',
        description: 'Livello di consistenza'
      },
      {
        name: 'enable_automatic_failover',
        label: 'Automatic Failover',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Abilita failover automatico'
      }
    ]
  },
  // api_management: {
  //   id: 'api_management',
  //   name: 'API Management',
  //   description: 'Azure API Management per gestione API',
  //   icon: '🔌',
  //   sourcePath: './.terraform/modules/__v4__/IDH/api_management',
  //   fields: [
  //     {
  //       name: 'name',
  //       label: 'Name',
  //       type: 'text',
  //       required: true,
  //       description: 'Nome dell\'API Management',
  //       placeholder: 'myapim'
  //     },
  //     {
  //       name: 'idh_resource_tier',
  //       label: 'Resource Tier',
  //       type: 'select',
  //       required: true,
  //       options: ['standard', 'premium', 'consumption'],
  //       defaultValue: 'standard',
  //       description: 'Tier delle risorse IDH'
  //     },
  //     {
  //       name: 'sku_name',
  //       label: 'SKU Name',
  //       type: 'select',
  //       required: true,
  //       options: ['Developer_1', 'Standard_1', 'Premium_1', 'Consumption'],
  //       defaultValue: 'Developer_1',
  //       description: 'SKU dell\'API Management'
  //     },
  //     {
  //       name: 'publisher_name',
  //       label: 'Publisher Name',
  //       type: 'text',
  //       required: true,
  //       description: 'Nome del publisher',
  //       placeholder: 'PagoPA'
  //     },
  //     {
  //       name: 'publisher_email',
  //       label: 'Publisher Email',
  //       type: 'text',
  //       required: true,
  //       description: 'Email del publisher',
  //       placeholder: 'tech@pagopa.it'
  //     }
  //   ]
  // }
};