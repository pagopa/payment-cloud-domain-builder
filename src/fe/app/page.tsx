
"use client";
import { useState } from "react";
import React from "react";

// Definizione tipi dati form
type FormData = {
  domain_name: string;
  is_dev_public: boolean;
  storage_accounts: { name: string; container: string }[];
  keyvaults: { name: string }[];
  subscription: string;
  log_analytics_ws_name: string;
  log_analytics_ws_rg_name: string;
  monitor_rg_name: string;
  monitor_action_group_slack_name: string;
  monitor_action_group_email_name: string;
  monitor_action_group_opsgenie_name: string;
  azdo_managed_identity_rg_name: string;
  azdo_managed_identity_iac_prefix: string;
  vnet_name: string;
  vnet_rg_name: string;
  product_name: string;
  location: string;
  postgres_db_names: { name: string }[];
  redis_names: { name: string }[];
  mongo_names: { name: string }[];
};

const defaultForm: FormData = {
  domain_name: "",
  is_dev_public: false,
  storage_accounts: [{ name: "", container: "" }],
  keyvaults: [{ name: "" }],
  subscription: "",
  log_analytics_ws_name: "",
  log_analytics_ws_rg_name: "",
  monitor_rg_name: "",
  monitor_action_group_slack_name: "",
  monitor_action_group_email_name: "",
  monitor_action_group_opsgenie_name: "",
  azdo_managed_identity_rg_name: "",
  azdo_managed_identity_iac_prefix: "",
  vnet_name: "",
  vnet_rg_name: "",
  product_name: "",
  location: "",
  postgres_db_names: [{ name: "" }],
  redis_names: [{ name: "" }],
  mongo_names: [{ name: "" }]
};

const allSections = [
  { key: "base", label: "Base" },
  { key: "storage", label: "Storage Account" },
  { key: "keyvault", label: "KeyVault" },
  { key: "monitoring", label: "Monitoring" },
  { key: "network", label: "Network" },
  { key: "postgres", label: "PostgreSQL" },
  { key: "redis", label: "Redis" },
  { key: "mongo", label: "MongoDB"}
];

function toTerraform(data: any, indent = 0): string {
  if (Array.isArray(data)) {
    return data
      .map(
        v =>
          " ".repeat(indent) +
          (typeof v === "object" && v !== null
            ? toTerraform(v, indent + 2)
            : `"${v}"`)
      )
      .join("\n");
  } else if (typeof data === "object" && data !== null) {
    return Object.entries(data)
      .map(
        ([k, v]) =>
          " ".repeat(indent) +
          k + " = " +
          (Array.isArray(v)
            ? "[\n" + toTerraform(v, indent + 2) + "\n" + " ".repeat(indent) + "]"
            : typeof v === "object" && v !== null
            ? "{\n" + toTerraform(v, indent + 2) + "\n" + " ".repeat(indent) + "}"
            : typeof v === "boolean" ? v.toString() : `"${v}"`)
      )
      .join("\n");
  }
  return String(data);
}

// Funzione che converte formData in moduli Terraform
function formDataToModules(data: FormData): string {
  let modules: string[] = [];

  // Base configuration
  if (data.domain_name) {
    modules.push(`
# Base Configuration
locals {
  domain_name    = "${data.domain_name}"
  product_name   = "${data.product_name}"
  location       = "${data.location}"
  subscription   = "${data.subscription}"
  is_dev_public  = ${data.is_dev_public}
}
    `.trim());
  }

  // PostgreSQL
  data.postgres_db_names.forEach((pg, idx) => {
    if (pg.name) {
      modules.push(`
module "postgres_${pg.name.replace(/[^a-zA-Z0-9]/g, '_')}" {
  source = "./.terraform/modules/__v4__/IDH/postgres_flexible_server"

  name                = "\${local.project}-${pg.name}-postgresql"
  location            = local.location
  resource_group_name = "\${local.project}-db-rg"

  env               = var.env
  idh_resource_tier = var.pgres_flex_params.idh_resource
  product_name      = local.prefix

  databases = ["${pg.name}"]

  tags = module.tag_config.tags
}
      `.trim());
    }
  });

  // KeyVault
  data.keyvaults.forEach((kv, idx) => {
    if (kv.name) {
      modules.push(`
module "key_vault_${kv.name.replace(/[^a-zA-Z0-9]/g, '_')}" {
  source = "./.terraform/modules/__v4__/IDH/key_vault"

  name                = "${kv.name}"
  location            = local.location
  resource_group_name = "\${local.project}-sec-rg"

  tenant_id = data.azurerm_client_config.current.tenant_id

  tags = module.tag_config.tags
}
      `.trim());
    }
  });

  // Storage Accounts
  data.storage_accounts.forEach((sa, idx) => {
    if (sa.name) {
      modules.push(`
module "storage_account_${sa.name.replace(/[^a-zA-Z0-9]/g, '_')}" {
  source = "./.terraform/modules/__v4__/IDH/storage_account"

  name                = "${sa.name}"
  account_tier        = "Standard"
  account_replication_type = "LRS"
  resource_group_name = "\${local.project}-storage-rg"
  location            = local.location

  containers = [
    {
      name        = "${sa.container}"
      access_type = "private"
    }
  ]

  tags = module.tag_config.tags
}
      `.trim());
    }
  });

  // Redis
  data.redis_names.forEach((redis, idx) => {
    if (redis.name) {
      modules.push(`
module "redis_${redis.name.replace(/[^a-zA-Z0-9]/g, '_')}" {
  source = "./.terraform/modules/__v4__/IDH/redis_cache"

  name                = "${redis.name}"
  location            = local.location
  resource_group_name = "\${local.project}-data-rg"

  capacity = 1
  family   = "C"
  sku_name = "Standard"

  subnet_id = module.redis_snet.id

  tags = module.tag_config.tags
}
      `.trim());
    }
  });

  // MongoDB
  data.mongo_names.forEach((mongo, idx) => {
    if (mongo.name) {
      modules.push(`
module "cosmos_mongo_${mongo.name.replace(/[^a-zA-Z0-9]/g, '_')}" {
  source = "./.terraform/modules/__v4__/IDH/cosmosdb_mongo"

  name                = "${mongo.name}"
  location            = local.location
  resource_group_name = "\${local.project}-data-rg"

  offer_type          = "Standard"
  kind                = "MongoDB"
  enable_free_tier    = false

  databases = [
    {
      name       = "${mongo.name}_db"
      throughput = 400
    }
  ]

  tags = module.tag_config.tags
}
      `.trim());
    }
  });

  // Network configuration
  if (data.vnet_name) {
    modules.push(`
# Network Data Sources
data "azurerm_virtual_network" "vnet" {
  name                = "${data.vnet_name}"
  resource_group_name = "${data.vnet_rg_name}"
}

data "azurerm_resource_group" "rg_vnet" {
  name = "${data.vnet_rg_name}"
}
    `.trim());
  }

  // Monitoring configuration
  if (data.log_analytics_ws_name) {
    modules.push(`
# Monitoring Data Sources
data "azurerm_log_analytics_workspace" "log_analytics_workspace" {
  name                = "${data.log_analytics_ws_name}"
  resource_group_name = "${data.log_analytics_ws_rg_name}"
}

data "azurerm_monitor_action_group" "slack" {
  resource_group_name = "${data.monitor_rg_name}"
  name                = "${data.monitor_action_group_slack_name}"
}

data "azurerm_monitor_action_group" "email" {
  resource_group_name = "${data.monitor_rg_name}"
  name                = "${data.monitor_action_group_email_name}"
}
    `.trim());
  }

  return modules.join('\n\n');
}

export default function Wizard() {
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [currentSection, setCurrentSection] = useState<string>("base");
  const [success, setSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedModules, setCopiedModules] = useState<boolean>(false);
  const [outputType, setOutputType] = useState<"yaml" | "modules">("modules");

  // Cambia valore campo semplice
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Modifica array dinamici
  const handleArrayChange = (
    arrKey: keyof FormData,
    idx: number,
    field: string,
    value: string
  ) => {
    // @ts-ignore
    const updated = [...formData[arrKey]];
    updated[idx][field] = value;
    setFormData(prev => ({
      ...prev,
      [arrKey]: updated
    }));
  };

  const addArrayEntry = (
    arrKey: keyof FormData,
    defaultValue: Record<string, string>
  ) => {
    // @ts-ignore
    setFormData(prev => ({
      ...prev,
      [arrKey]: [...prev[arrKey], { ...defaultValue }]
    }));
  };

  const removeArrayEntry = (arrKey: keyof FormData, idx: number) => {
    // @ts-ignore
    setFormData(prev => ({
      ...prev,
      [arrKey]: prev[arrKey].filter((_: any, i: number) => i !== idx)
    }));
  };

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
  };

  // Copia output YAML
  const handleCopy = () => {
    navigator.clipboard.writeText(toTerraform(formData));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Copia output Moduli Terraform
  const handleCopyModules = () => {
    const modulesOutput = formDataToModules(formData);
    navigator.clipboard.writeText(modulesOutput);
    setCopiedModules(true);
    setTimeout(() => setCopiedModules(false), 1500);
  };

  // CARD: campi per sezione
  const renderSection = () => {
    switch (currentSection) {
      case "base":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-indigo-400">Base Configuration</h2>
            <label className="block text-sm font-semibold">
              Nome dominio
              <input
                type="text"
                name="domain_name"
                value={formData.domain_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
                placeholder="es: meme"
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_dev_public"
                checked={formData.is_dev_public}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Ambiente DEV pubblico?
            </label>
            <label className="block text-sm font-semibold">
              Subscription
              <input
                type="text"
                name="subscription"
                value={formData.subscription}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
                placeholder="es: DEV-PagoPA"
              />
            </label>
            <label className="block text-sm font-semibold">
              Nome prodotto
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
                placeholder="es: pagopa"
              />
            </label>
            <label className="block text-sm font-semibold">
              Location
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
              >
                <option value="">Seleziona una regione...</option>
                <option value="italynorth">italynorth</option>
                <option value="westeurope">westeurope</option>
                <option value="northeurope">northeurope</option>
              </select>
            </label>
          </div>
        );
      case "storage":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-sky-400">Storage Account(s)</h2>
            {formData.storage_accounts.map((sa, idx) => (
              <div key={idx} className="border border-sky-600 rounded p-3 mb-2 space-y-2">
                <label>
                  Storage Account Name
                  <input
                    type="text"
                    value={sa.name}
                    onChange={e =>
                      handleArrayChange("storage_accounts", idx, "name", e.target.value)
                    }
                    className="w-full p-2 mt-1 border bg-zinc-900 border-zinc-600 rounded text-zinc-100"
                  />
                </label>
                <label>
                  Storage Container Name
                  <input
                    type="text"
                    value={sa.container}
                    onChange={e =>
                      handleArrayChange("storage_accounts", idx, "container", e.target.value)
                    }
                    className="w-full p-2 mt-1 border bg-zinc-900 border-zinc-600 rounded text-zinc-100"
                  />
                </label>
                <button
                  type="button"
                  className="text-xs text-red-400 mt-2"
                  onClick={() => removeArrayEntry("storage_accounts", idx)}
                  disabled={formData.storage_accounts.length === 1}
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-1 px-3 py-1 rounded bg-sky-800 text-sky-50 text-sm"
              onClick={() => addArrayEntry("storage_accounts", { name: "", container: "" })}
            >
              Aggiungi Storage
            </button>
          </div>
        );
      case "keyvault":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-green-400">KeyVault</h2>
            {formData.keyvaults.map((kv, idx) => (
              <div key={idx} className="border border-green-600 rounded p-3 mb-2 space-y-2">
                <label>
                  KeyVault Name
                  <input
                    type="text"
                    value={kv.name}
                    onChange={e =>
                      handleArrayChange("keyvaults", idx, "name", e.target.value)
                    }
                    className="w-full p-2 mt-1 border bg-zinc-900 border-green-800 rounded text-zinc-100"
                  />
                </label>
                <button
                  type="button"
                  className="text-xs text-red-400 mt-2"
                  onClick={() => removeArrayEntry("keyvaults", idx)}
                  disabled={formData.keyvaults.length === 1}
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-1 px-3 py-1 rounded bg-green-800 text-green-50 text-sm"
              onClick={() => addArrayEntry("keyvaults", { name: "" })}
            >
              Aggiungi KeyVault
            </button>
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Azure DevOps Managed Identity Resource Group
                <input
                  type="text"
                  name="azdo_managed_identity_rg_name"
                  value={formData.azdo_managed_identity_rg_name}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border bg-zinc-900 border-green-800 rounded text-zinc-100"
                  placeholder="es: meme-azdo-managed-identity-rg"
                />
              </label>
              <label className="block text-sm font-semibold">
                Azure DevOps IaC prefix
                <input
                  type="text"
                  name="azdo_managed_identity_iac_prefix"
                  value={formData.azdo_managed_identity_iac_prefix}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border bg-zinc-900 border-green-800 rounded text-zinc-100"
                  placeholder='es: azdo-${var.env}-pagopa-iac'
                />
              </label>
            </div>
          </div>
        );
      case "monitoring":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-pink-400">Monitoring</h2>
            <label className="block text-sm font-semibold">
              Log Analytics Workspace Name
              <input
                type="text"
                name="log_analytics_ws_name"
                value={formData.log_analytics_ws_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-pink-800 rounded text-zinc-100"
                placeholder="es: meme-law"
              />
            </label>
            <label className="block text-sm font-semibold">
              Log Analytics Workspace Resource Group
              <input
                type="text"
                name="log_analytics_ws_rg_name"
                value={formData.log_analytics_ws_rg_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-pink-800 rounded text-zinc-100"
                placeholder="es: meme-monitor-rg"
              />
            </label>
            <label className="block text-sm font-semibold">
              Monitor Resource Group Name
              <input
                type="text"
                name="monitor_rg_name"
                value={formData.monitor_rg_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-pink-800 rounded text-zinc-100"
                placeholder="es: meme-rg"
              />
            </label>
            <label className="block text-sm font-semibold">
              Action Group Name (Slack)
              <input
                type="text"
                name="monitor_action_group_slack_name"
                value={formData.monitor_action_group_slack_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-pink-800 rounded text-zinc-100"
                placeholder="es: meme-action-group-slack"
              />
            </label>
            <label className="block text-sm font-semibold">
              Action Group Name (Email)
              <input
                type="text"
                name="monitor_action_group_email_name"
                value={formData.monitor_action_group_email_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-pink-800 rounded text-zinc-100"
                placeholder="es: meme-action-group-email"
              />
            </label>
            <label className="block text-sm font-semibold">
              Action Group Name (Opsgenie)
              <input
                type="text"
                name="monitor_action_group_opsgenie_name"
                value={formData.monitor_action_group_opsgenie_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-pink-800 rounded text-zinc-100"
                placeholder="es: meme-action-group-opsgenie"
              />
            </label>
          </div>
        );
      case "network":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-teal-400">Network</h2>
            <label className="block text-sm font-semibold">
              VNet Name
              <input
                type="text"
                name="vnet_name"
                value={formData.vnet_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-teal-800 rounded text-zinc-100"
                placeholder="es: meme-vnet"
              />
            </label>
            <label className="block text-sm font-semibold">
              VNet Resource Group Name
              <input
                type="text"
                name="vnet_rg_name"
                value={formData.vnet_rg_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border bg-zinc-900 border-teal-800 rounded text-zinc-100"
                placeholder="es: meme-vnet-rg"
              />
            </label>
          </div>
        );
      case "postgres":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-yellow-400">PostgreSQL DB(s)</h2>
            {formData.postgres_db_names.map((pg, idx) => (
              <div key={idx} className="border border-yellow-600 rounded p-3 mb-2 space-y-2">
                <label>
                  PostgreSQL DB Name
                  <input
                    type="text"
                    value={pg.name}
                    onChange={e =>
                      handleArrayChange("postgres_db_names", idx, "name", e.target.value)
                    }
                    className="w-full p-2 mt-1 border bg-zinc-900 border-yellow-800 rounded text-zinc-100"
                  />
                </label>
                <button
                  type="button"
                  className="text-xs text-red-400 mt-2"
                  onClick={() => removeArrayEntry("postgres_db_names", idx)}
                  disabled={formData.postgres_db_names.length === 1}
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-1 px-3 py-1 rounded bg-yellow-800 text-yellow-50 text-sm"
              onClick={() => addArrayEntry("postgres_db_names", { name: "" })}
            >
              Aggiungi DB PostgreSQL
            </button>
          </div>
        );
      case "redis":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-red-400">Redis</h2>
            {formData.redis_names.map((rd, idx) => (
              <div key={idx} className="border border-red-600 rounded p-3 mb-2 space-y-2">
                <label>
                  Redis Name
                  <input
                    type="text"
                    value={rd.name}
                    onChange={e =>
                      handleArrayChange("redis_names", idx, "name", e.target.value)
                    }
                    className="w-full p-2 mt-1 border bg-zinc-900 border-red-800 rounded text-zinc-100"
                  />
                </label>
                <button
                  type="button"
                  className="text-xs text-red-400 mt-2"
                  onClick={() => removeArrayEntry("redis_names", idx)}
                  disabled={formData.redis_names.length === 1}
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-1 px-3 py-1 rounded bg-red-800 text-red-50 text-sm"
              onClick={() => addArrayEntry("redis_names", { name: "" })}
            >
              Aggiungi Redis
            </button>
          </div>
        );
      case "mongo":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-lime-400">MongoDB</h2>
            {formData.mongo_names.map((mg, idx) => (
              <div key={idx} className="border border-lime-600 rounded p-3 mb-2 space-y-2">
                <label>
                  MongoDB Name
                  <input
                    type="text"
                    value={mg.name}
                    onChange={e =>
                      handleArrayChange("mongo_names", idx, "name", e.target.value)
                    }
                    className="w-full p-2 mt-1 border bg-zinc-900 border-lime-800 rounded text-zinc-100"
                  />
                </label>
                <button
                  type="button"
                  className="text-xs text-red-400 mt-2"
                  onClick={() => removeArrayEntry("mongo_names", idx)}
                  disabled={formData.mongo_names.length === 1}
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-1 px-3 py-1 rounded bg-lime-800 text-lime-100 text-sm"
              onClick={() => addArrayEntry("mongo_names", { name: "" })}
            >
              Aggiungi MongoDB
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      {/* NAVBAR */}
      <header className="w-full flex items-center bg-zinc-950 border-b border-zinc-800 px-6 py-3 shadow fixed z-20 top-0 left-0">
        <svg
          className="w-8 h-8 mr-3 text-indigo-400"
          fill="none"
          viewBox="0 0 32 32"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            d="M10 24a6 6 0 0 1 0-12 7 7 0 0 1 13.9 1.7A5 5 0 1 1 27 24H10z"
            fill="currentColor"
            opacity=".25"
          />
          <path
            d="M16 12a7 7 0 0 1 6.93 6.01A5 5 0 1 1 23 24H11a6 6 0 0 1 .38-12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xl font-bold tracking-tight text-indigo-200 font-mono drop-shadow">
          IDH: <span className="text-zinc-100 font-normal">Infrastructure Design HandBook</span>
        </span>
      </header>
      <div className="h-16" />

      {/* LAYOUT 3 COLONNE */}
      <main className="flex-1 flex px-0 pb-8 bg-zinc-950">
        {/* SIDENAV */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col gap-4">
          {allSections.map(section => (
            <button
              key={section.key}
              className={`text-left px-3 py-2 rounded font-mono flex items-center gap-3 ${
                currentSection === section.key
                  ? "bg-indigo-900 text-indigo-300"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
              onClick={() => setCurrentSection(section.key)}
            >
              {/* ICONE PER TUTTE LE SEZIONI */}
              {section.key === 'base' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {section.key === 'storage' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              )}
              {section.key === 'keyvault' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )}
              {section.key === 'monitoring' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )}
              {section.key === 'network' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              )}
              {section.key === 'postgres' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              )}
              {section.key === 'redis' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {section.key === 'mongo' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )}
              <span>{section.label}</span>
            </button>
          ))}
        </aside>


        {/* FORM */}
        <section className="flex-1 max-w-2xl mx-auto p-8 border-r border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderSection()}
            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-700 rounded text-white font-semibold shadow"
              >
                Genera Terraform
              </button>
            </div>
          </form>
        </section>

        {/* OUTPUT */}
        <section className="flex-1 bg-zinc-900 p-7 flex flex-col border-l border-zinc-800">
          <div className="flex items-center mb-2 justify-between">
            <h3 className="font-mono text-indigo-400 font-bold text-lg">
              Output
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={outputType}
                onChange={(e) => setOutputType(e.target.value as "yaml" | "modules")}
                className="px-2 py-1 rounded font-mono text-xs bg-zinc-800 text-zinc-100 border border-zinc-700"
              >
                <option value="yaml">YAML</option>
                <option value="modules">Terraform Modules</option>
              </select>
              {outputType === "yaml" ? (
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!success}
                  className={`px-3 py-1 rounded font-mono text-sm shadow border border-indigo-700
                    ${success ? "bg-zinc-800 text-indigo-300 hover:bg-indigo-700 hover:text-white" : "bg-zinc-950 text-zinc-700 cursor-not-allowed"}`}
                >
                  {copied ? "Copiato!" : "Copia YAML"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCopyModules}
                  disabled={!success}
                  className={`px-3 py-1 rounded font-mono text-sm shadow border border-indigo-700
                    ${success ? "bg-zinc-800 text-indigo-300 hover:bg-indigo-700 hover:text-white" : "bg-zinc-950 text-zinc-700 cursor-not-allowed"}`}
                >
                  {copiedModules ? "Copiato!" : "Copia Modules"}
                </button>
              )}
            </div>
          </div>
          <pre className="flex-1 bg-zinc-950 border border-zinc-800 rounded p-4 overflow-x-auto text-xs whitespace-pre-wrap">
            {success
              ? outputType === "yaml"
                ? toTerraform(formData)
                : formDataToModules(formData)
              : "Compila il form e genera per vedere l'output..."
            }
          </pre>
        </section>
      </main>
    </div>
  );
}