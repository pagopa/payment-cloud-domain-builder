import React, { useRef } from 'react';
import { formConfig } from '../../utils/inputs';

interface ExportImportProps {
  formData: any; /* eslint-disable-line  @typescript-eslint/no-explicit-any */
  updateFormData: (data: any) => void; /* eslint-disable-line  @typescript-eslint/no-explicit-any */
  onComponentsImport?: (components: string[]) => void;
}

export const ExportImport: React.FC<ExportImportProps> = ({ 
  formData, 
  updateFormData,
  onComponentsImport 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          
          if (importedData.formData) {
            console.log('📦 Imported data:', importedData);
            
            updateFormData(importedData.formData);
            
            const activeComponents: string[] = [];
            
            Object.keys(formConfig.steps).forEach(stepKey => {
              const step = formConfig.steps[stepKey];
              
              if (step.default) return;
              
              console.log(`🔍 Checking step: ${stepKey}`);
              
              const includeField = step.formFields.find(
                field => field.key.startsWith('include_') && field.type === 'hidden'
              );
              
              if (includeField) {
                const fieldValue = importedData.formData[includeField.key];
                console.log(`  ↳ Include field "${includeField.key}" =`, fieldValue);
                
                if (fieldValue === 'true' || fieldValue === true) {
                  console.log(`  ✅ Component "${stepKey}" is active (via include field)`);
                  activeComponents.push(stepKey);
                  return; // Trovato, passa al prossimo
                }
              }
              
              const hasValues = step.formFields.some(field => {
                if (field.type === 'hidden' || field.key.startsWith('include_')) {
                  return false;
                }
                
                const value = importedData.formData[field.key];
                const isNotEmpty = value !== '' && value !== null && value !== undefined && value !== false;
                
                if (isNotEmpty) {
                  console.log(`  ↳ Field "${field.key}" has value:`, value);
                }
                
                return isNotEmpty;
              });
              
              if (hasValues) {
                console.log(`  ✅ Component "${stepKey}" is active (has values)`);
                activeComponents.push(stepKey);
              }
            });
            
            console.log('🎯 Active components detected:', activeComponents);
            
            if (onComponentsImport) {
              if (activeComponents.length > 0) {
                onComponentsImport(activeComponents);
              } else {
                console.warn('⚠️ No active components detected in imported file');
              }
            }
            
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
            notification.innerHTML = `
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Configuration imported! ${activeComponents.length} component(s) activated.</span>
              </div>
            `;
            document.body.appendChild(notification);
            
            // Rimuovi notifica dopo 3 secondi
            setTimeout(() => {
              notification.remove();
            }, 3000);
          }
        } catch (error) {
          console.error('❌ Error parsing JSON file:', error);
          
          const errorNotification = document.createElement('div');
          errorNotification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
          errorNotification.innerHTML = `
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <span>Failed to import configuration. Invalid JSON file.</span>
            </div>
          `;
          document.body.appendChild(errorNotification);
          
          setTimeout(() => {
            errorNotification.remove();
          }, 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const dataToExport = {
      formData: formData,
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `domain_builder_config_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
      <button
        onClick={handleImport}
        className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Import Config
      </button>
      <button
        onClick={handleExport}
        className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export Config
      </button>
    </div>
  );
};