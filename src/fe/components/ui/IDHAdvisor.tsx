"use client";
import React, { useState } from 'react';
import { idhModules } from '@/utils/idhModules';

export const IdhAdvisor: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean>>({});
  const [showCode, setShowCode] = useState(false);

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowCode(false);

    const module = idhModules[moduleId];
    const defaults: Record<string, string | number | boolean> = {};
    module.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        defaults[field.name] = field.defaultValue;
      }
    });
    setFormValues(defaults);
  };

  const handleFieldChange = (fieldName: string, value: string | number | boolean) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const generateTerraformCode = (): string => {
    if (!selectedModule) return '';

    const module = idhModules[selectedModule];
    const moduleName = formValues.name || 'resource_name';

    let code = `module "${moduleName}" {\n`;
    code += `  source = "${module.sourcePath}"\n\n`;
    code += `  env      = var.env\n`;
    code += `  location = var.location\n`;
    code += `  prefix   = var.prefix\n`;
    code += `  tags     = var.tags\n`;
    code += `  resource_group_name = azurerm_resource_group.rg.name\n\n`;

    // Aggiungi i campi configurati
    module.fields.forEach(field => {
      if (formValues[field.name] !== undefined && formValues[field.name] !== '') {
        const value = formValues[field.name];
        if (field.type === 'text' || field.type === 'select') {
          code += `  ${field.name} = "${value}"\n`;
        } else if (field.type === 'boolean') {
          code += `  ${field.name} = ${value}\n`;
        } else {
          code += `  ${field.name} = ${value}\n`;
        }
      }
    });

    code += `}\n`;
    return code;
  };

  const renderModuleSelector = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(idhModules).map(module => (
            <button
                key={module.id}
                onClick={() => handleModuleSelect(module.id)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer text-left ${
                    selectedModule === module.id
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:border-indigo-500 hover:dark:border-zinc-600'
                }`}
            >
              <div className="flex items-start gap-4">
                <module.icon />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-2">{module.name}</h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-400">{module.description}</p>
                </div>
              </div>
            </button>
        ))}
      </div>
  );

  const renderModuleForm = () => {
    if (!selectedModule) return null;

    const module = idhModules[selectedModule];

    return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{module.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{module.name}</h3>
                <p className="text-zinc-800 dark:text-zinc-400">{module.description}</p>
              </div>
            </div>
            <button
                onClick={() => {
                  setSelectedModule(null);
                  setShowCode(false);
                }}
                className="px-4 py-2 text-zinc-800 dark:text-zinc-400 hover:text-zinc-600 hover:dark:text-white cursor-pointer transition-colors"
            >
              ← Torna indietro
            </button>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6 border border-indigo-300 dark:border-zinc-700">
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Configurazione</h4>
            <div className="space-y-4">
              {module.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-300 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    {field.description && (
                        <p className="text-xs text-zinc-700 dark:text-zinc-400 mb-2">{field.description}</p>
                    )}

                    {field.type === 'text' && (
                        <input
                            type="text"
                            value={(formValues[field.name] as string) || ''}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg text-black dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                    )}

                    {field.type === 'number' && (
                        <input
                            type="number"
                            value={(formValues[field.name] as number) || ''}
                            onChange={(e) => handleFieldChange(field.name, parseInt(e.target.value))}
                            className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg text-black dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                    )}

                    {field.type === 'select' && (
                        <select
                            value={(formValues[field.name] as string) || ''}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-500 dark:border-zinc-600 rounded-lg text-black dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                        >
                          <option value="">Seleziona...</option>
                          {field.options?.map(option => (
                              <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                    )}

                    {field.type === 'boolean' && (
                        <div className="flex items-center gap-2">
                          <input
                              type="checkbox"
                              checked={(formValues[field.name] as boolean) || false}
                              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                              className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-zinc-800 dark:text-zinc-400">Abilita</span>
                        </div>
                    )}
                  </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
                onClick={() => setShowCode(!showCode)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
                <span className="w-45">{showCode ? '🕵️‍♂️   Nascondi Codice' : '🚀   Genera Codice'}</span>
            </button>
          </div>
        </div>
    );
  };

  const renderCodePreview = () => {
    if (!showCode || !selectedModule) return null;

    const code = generateTerraformCode();

    return (
        <div className="mt-6 bg-zinc-200 dark:bg-zinc-900 rounded-xl border border-indigo-300 dark:border-zinc-700 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between p-4 bg-zinc-300 dark:bg-zinc-800 border-b border-zinc-700">
            <h4 className="text-lg font-semibold text-zinc-800 dark:text-white flex items-center gap-2">
              <span>📝</span>
              Codice Terraform Generato
            </h4>
            <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  const button = document.activeElement as HTMLButtonElement;
                  const originalText = button.innerHTML;
                  button.innerHTML = '✅ Copiato!';
                  setTimeout(() => {
                    button.innerHTML = originalText;
                  }, 2000);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              📋 Copia
            </button>
          </div>
          <pre className="p-6 text-sm text-zinc-800 dark:text-zinc-300 overflow-x-auto">
          <code className="language-terraform">{code}</code>
        </pre>
        </div>
    );
  };

  return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
            IDH Module Advisor
          </h1>
          <p className="text-zinc-800 dark:text-zinc-400 text-lg">
            Configura e genera moduli Terraform IDH in modo semplice e veloce
          </p>
            <p className="text-zinc-800 dark:text-zinc-400 text-lg">
                <i className="text-amber-600">Technical preview</i>
            </p>
        </div>

        {!selectedModule && renderModuleSelector()}
        {selectedModule && (
            <>
              {renderModuleForm()}
              {renderCodePreview()}
            </>
        )}
      </div>
  );
};