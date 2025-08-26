// utils/terraform.ts
interface FormData {
  [key: string]: any;
}

const FIELD_CATEGORIES = {
  '🏗️ Configurazione Base': [
    'domain_name', 'product_name', 'location', 'is_dev_public', 'environment'
  ],
  '💾 Storage Account': [
    'storage_account_state_name', 'storage_account_container_state_name', 
    'subscription', 'storage_tier', 'storage_replication'
  ],
  '📊 Log Analytics': [
    'log_analytics_ws_name', 'log_analytics_ws_rg_name', 'log_analytics_retention'
  ],
  '🔔 Monitoraggio': [
    'monitor_rg_name', 'monitor_action_group_slack_name', 
    'monitor_action_group_email_name', 'monitor_action_group_opsgenie_name',
    'enable_monitoring', 'alert_threshold'
  ],
  '🔐 Azure DevOps Identity': [
    'azdo_managed_identity_rg_name', 'azdo_managed_identity_iac_prefix',
    'azdo_project_name', 'azdo_service_connection'
  ],
  '🌐 Virtual Network': [
    'vnet_name', 'vnet_rg_name', 'subnet_name', 'vnet_address_space'
  ],
  '🐘 PostgreSQL': [
    'postgres_enabled', 'postgres_server_name', 'postgres_admin_username',
    'postgres_version', 'postgres_sku', 'postgres_storage_mb',
    'postgres_backup_retention_days', 'postgres_geo_redundant_backup'
  ],
  '🗄️ Redis Cache': [
    'redis_enabled', 'redis_name', 'redis_sku_name', 'redis_family',
    'redis_capacity', 'redis_enable_non_ssl_port'
  ],
  '🔍 Application Insights': [
    'app_insights_enabled', 'app_insights_name', 'app_insights_type',
    'app_insights_retention_days'
  ],
  '🚀 Container Registry': [
    'acr_enabled', 'acr_name', 'acr_sku', 'acr_admin_enabled'
  ],
  '☸️ Kubernetes': [
    'aks_enabled', 'aks_cluster_name', 'aks_node_count', 'aks_vm_size',
    'aks_kubernetes_version', 'aks_enable_rbac'
  ]
};

const FIELD_LABELS = {
  // Base
  'domain_name': 'Nome Dominio',
  'product_name': 'Nome Prodotto',
  'location': 'Località',
  'is_dev_public': 'Ambiente Pubblico Dev',
  'environment': 'Ambiente',
  
  // Storage
  'storage_account_state_name': 'Nome State Storage',
  'storage_account_container_state_name': 'Nome Container State',
  'subscription': 'Subscription',
  'storage_tier': 'Tier Storage',
  'storage_replication': 'Replica Storage',
  
  // Log Analytics
  'log_analytics_ws_name': 'Nome Workspace',
  'log_analytics_ws_rg_name': 'Resource Group Workspace',
  'log_analytics_retention': 'Giorni Retention',
  
  // Monitoring
  'monitor_rg_name': 'Resource Group Monitor',
  'monitor_action_group_slack_name': 'Action Group Slack',
  'monitor_action_group_email_name': 'Action Group Email',
  'monitor_action_group_opsgenie_name': 'Action Group Opsgenie',
  'enable_monitoring': 'Abilita Monitoraggio',
  'alert_threshold': 'Soglia Alert',
  
  // Azure DevOps
  'azdo_managed_identity_rg_name': 'Resource Group Identity',
  'azdo_managed_identity_iac_prefix': 'Prefisso IAC',
  'azdo_project_name': 'Nome Progetto',
  'azdo_service_connection': 'Service Connection',
  
  // VNet
  'vnet_name': 'Nome VNet',
  'vnet_rg_name': 'Resource Group VNet',
  'subnet_name': 'Nome Subnet',
  'vnet_address_space': 'Spazio Indirizzi',
  
  // PostgreSQL
  'postgres_enabled': 'PostgreSQL Abilitato',
  'postgres_server_name': 'Nome Server',
  'postgres_admin_username': 'Username Admin',
  'postgres_version': 'Versione PostgreSQL',
  'postgres_sku': 'SKU',
  'postgres_storage_mb': 'Storage (MB)',
  'postgres_backup_retention_days': 'Giorni Backup',
  'postgres_geo_redundant_backup': 'Backup Geo-ridondante',
  
  // Redis
  'redis_enabled': 'Redis Abilitato',
  'redis_name': 'Nome Redis',
  'redis_sku_name': 'SKU Redis',
  'redis_family': 'Famiglia Redis',
  'redis_capacity': 'Capacità',
  'redis_enable_non_ssl_port': 'Porta Non-SSL',
  
  // App Insights
  'app_insights_enabled': 'App Insights Abilitato',
  'app_insights_name': 'Nome App Insights',
  'app_insights_type': 'Tipo App Insights',
  'app_insights_retention_days': 'Giorni Retention',
  
  // Container Registry
  'acr_enabled': 'Container Registry Abilitato',
  'acr_name': 'Nome Registry',
  'acr_sku': 'SKU Registry',
  'acr_admin_enabled': 'Admin Abilitato',
  
  // Kubernetes
  'aks_enabled': 'AKS Abilitato',
  'aks_cluster_name': 'Nome Cluster',
  'aks_node_count': 'Numero Nodi',
  'aks_vm_size': 'Dimensione VM',
  'aks_kubernetes_version': 'Versione Kubernetes',
  'aks_enable_rbac': 'RBAC Abilitato'
};

export function renderTerraformPreview(data: FormData): string {
  const categorizedFields = categorizeFields(data);
  const stats = calculateStats(data);
  
  let preview = `# 🚀 Preview Variabili Workflow

## 📋 Configurazione Completa

`;

  Object.entries(categorizedFields).forEach(([categoryName, fields]) => {
    if (fields.length > 0) {
      preview += `### ${categoryName}\n\n`;
      
      fields.forEach(([key, value]) => {
        const label = getFieldLabel(key);
        const displayValue = formatValue(value);
        const status = getValueStatus(value);
        preview += `- ${label}: ${displayValue} ${status}\n`;
      });
      
      preview += '\n';
    }
  });

  const uncategorizedFields = getUncategorizedFields(data);
  if (uncategorizedFields.length > 0) {
    preview += `### 🔧 Configurazioni Aggiuntive\n\n`;
    uncategorizedFields.forEach(([key, value]) => {
      const label = getFieldLabel(key);
      const displayValue = formatValue(value);
      const status = getValueStatus(value);
      preview += `- ${label}: ${displayValue} ${status}\n`;
    });
    preview += '\n';
  }

  preview += generateStatsSection(stats);
  preview += generateServicesSection(data);
  preview += generateValidationSection(data);

  return preview;
}

function categorizeFields(data: FormData): Record<string, [string, any][]> {
  const result: Record<string, [string, any][]> = {};
  
  Object.entries(FIELD_CATEGORIES).forEach(([category, fieldNames]) => {
    result[category] = [];
    fieldNames.forEach(fieldName => {
      if (fieldName in data) {
        result[category].push([fieldName, data[fieldName]]);
      }
    });
  });
  
  return result;
}

function getUncategorizedFields(data: FormData): [string, any][] {
  const categorizedFieldNames = Object.values(FIELD_CATEGORIES).flat();
  return Object.entries(data).filter(([key]) => !categorizedFieldNames.includes(key));
}

function getFieldLabel(key: string): string {
  return FIELD_LABELS[key as keyof typeof FIELD_LABELS] || key.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatValue(value: any): string {
  if (typeof value === 'boolean') {
    return value ? '✅ Abilitato' : '❌ Disabilitato';
  }
  
  if (value === null || value === undefined || value === '') {
    return '`⚠️ Non configurato`';
  }
  
  if (typeof value === 'number') {
    return `\`${value.toLocaleString()}\``;
  }
  
  const stringValue = value.toString();
  if (stringValue.length > 40) {
    return `\`${stringValue.substring(0, 37)}...\``;
  }
  
  return `\`${stringValue}\``;
}

function getValueStatus(value: any): string {
  if (value === null || value === undefined || 
      (typeof value === 'string' && value.trim() === '')) {
    return '⚠️';
  }
  return '✅';
}

function calculateStats(data: FormData) {
  const allFields = Object.entries(data);
  const configuredFields = allFields.filter(([_, value]) => 
    value !== null && value !== undefined && 
    (typeof value !== 'string' || value.trim() !== '') &&
    value !== false
  );
  
  return {
    total: allFields.length,
    configured: configuredFields.length,
    percentage: allFields.length > 0 ? Math.round((configuredFields.length / allFields.length) * 100) : 0
  };
}

function generateServicesSection(data: FormData): string {
  const services = [];
  
  if (data.postgres_enabled) services.push('🐘 PostgreSQL');
  if (data.redis_enabled) services.push('🗄️ Redis Cache');
  if (data.app_insights_enabled) services.push('🔍 Application Insights');
  if (data.acr_enabled) services.push('🚀 Container Registry');
  if (data.aks_enabled) services.push('☸️ Kubernetes (AKS)');
  if (data.enable_monitoring) services.push('🔔 Monitoraggio');
  
  if (services.length === 0) {
    return `## 🛠️ Servizi Abilitati
*Nessun servizio aggiuntivo abilitato*

`;
  }
  
  return `## 🛠️ Servizi Abilitati
${services.map(service => `- ${service}`).join('\n')}

`;
}

function generateStatsSection(stats: any): string {
  const completionEmoji = stats.percentage >= 90 ? '🎉' : 
                         stats.percentage >= 70 ? '👍' : '⚠️';
  
  return `---

## 📊 Statistiche Configurazione

| Metrica | Valore |
|---------|--------|
| Campi Totali | ${stats.total} |
| Campi Configurati | ${stats.configured} |
| Completamento | ${completionEmoji} ${stats.percentage}% |

`;
}

function generateValidationSection(data: FormData): string {
  const warnings = [];
  const criticalFields = ['domain_name', 'product_name', 'location'];
  
  criticalFields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      const label = getFieldLabel(field);
      warnings.push(`⚠️ ${label} è un campo critico non configurato`);
    }
  });

  if (data.postgres_enabled && !data.postgres_server_name) {
    warnings.push('⚠️ PostgreSQL abilitato ma nome server non specificato');
  }
  
  if (data.redis_enabled && !data.redis_name) {
    warnings.push('⚠️ Redis abilitato ma nome non specificato');
  }
  
  if (data.aks_enabled && (!data.aks_cluster_name || !data.aks_node_count)) {
    warnings.push('⚠️ AKS abilitato ma configurazione incompleta');
  }

  if (warnings.length === 0) {
    return `## ✅ Validazione
Tutte le configurazioni sono valide!

---
*🚀 Pronto per l'invio al workflow*`;
  }

  return `## ⚠️ Avvisi di Validazione

${warnings.join('\n')}

---
*⚠️ Risolvi gli avvisi prima di procedere*`;
}

// TODO POC for extended or compact
export function renderCompactPreview(data: FormData): string {
  const stats = calculateStats(data);
  const environment = data.is_dev_public ? '🧪 Development' : '🏭 Production';
  const enabledServices = Object.keys(data).filter(key => 
    key.includes('_enabled') && data[key] === true
  ).length;
  
  return `## 🎯 Preview Configurazione

Ambiente: ${environment}  
Prodotto: \`${data.product_name || 'Non specificato'}\`  
Località: \`${data.location || 'Non specificata'}\`  
Servizi Abilitati: ${enabledServices}  
Completamento: ${stats.percentage}% (${stats.configured}/${stats.total})

${stats.percentage >= 90 ? '✅ *Pronto per il deployment*' : '⚠️ *Configurazione incompleta*'}`;
}