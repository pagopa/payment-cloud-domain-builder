import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { formConfig } from '../../utils/inputs';
import { STEP_COLORS } from '../../utils/constants';
import {
  FaCloud,
  FaDatabase,
  FaMicrosoft,
  FaNetworkWired,
  FaLock,
  FaGithub,
  FaDocker
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiRedis,
} from 'react-icons/si';
import { MdStorage } from 'react-icons/md';


interface Template {
  name: string;
  description: string;
  icon: React.ReactNode;
  filename: string;
  components: ComponentIcon[];
}

interface ComponentIcon {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface IDHBuilderTemplatesProps {
  updateFormData: (data: any) => void; /* eslint-disable-line  @typescript-eslint/no-explicit-any */
  onComponentsImport?: (components: string[]) => void;
  currentStep: number;
}

const AVAILABLE_TEMPLATES: Template[] = [
  {
    name: '[PAGOPA] Meme Domain - Base WEU',
    description: 'Configurazione completa con APIM, AKS, Redis, Storage Account e GitHub Runner',
    icon: <FaMicrosoft className="text-4xl" />,
    filename: 'pagopa_basic_itn_domain.json',
    components: [
      { name: 'APIM', icon: <FaNetworkWired />, color: 'text-blue-400' },
      { name: 'AKS', icon: <SiKubernetes />, color: 'text-cyan-400' },
      { name: 'Redis', icon: <SiRedis />, color: 'text-red-400' },
      { name: 'Storage', icon: <MdStorage />, color: 'text-green-400' },
      { name: 'GitHub', icon: <FaGithub />, color: 'text-gray-400' }
    ]
  },
  {
    name: 'Altro dominio X',
    description: 'Setup base con monitoring, network e componenti essenziali di altro dominio X',
    icon: <SiKubernetes className="text-4xl" />,
    filename: 'x-infrastructure.json',
    components: [
      { name: 'AKS', icon: <SiKubernetes />, color: 'text-cyan-400' },
      { name: 'Network', icon: <FaNetworkWired />, color: 'text-purple-400' },
      { name: 'Database', icon: <FaDatabase />, color: 'text-yellow-400' }
    ]
  }
];

export const IDHBuilderTemplates: React.FC<IDHBuilderTemplatesProps> = ({
  updateFormData,
  onComponentsImport,
  currentStep
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);

  const buttonColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  useEffect(() => {
    setTemplates(AVAILABLE_TEMPLATES);
  }, []);

  const detectActiveComponents = (formData: any) => { /* eslint-disable-line  @typescript-eslint/no-explicit-any */
    const activeComponents: string[] = [];
    const availableSteps = Object.keys(formConfig.steps);

    availableSteps.forEach(step => {
      console.log(`   - "${step}"`);
    });


    const includeFields = Object.keys(formData).filter(key => key.startsWith('include_'));

    includeFields.forEach(key => {
      const value = formData[key];
      const componentName = key.replace('include_', '');

      if (value === 'true' || value === true) {
        if (availableSteps.includes(componentName)) {
          console.log(`   ✅ Adding "${componentName}" to active components`);
          activeComponents.push(componentName);
        } else {
          const matchingStep = availableSteps.find(step =>
            step.toLowerCase() === componentName.toLowerCase()
          );

          if (matchingStep) {
            console.log(`   ✅ Found case-insensitive match: "${matchingStep}"`);
            activeComponents.push(matchingStep);
          } else {
            console.warn(`   ⚠️ Component "${componentName}" NOT found in formConfig.steps`);

            const suggestions = availableSteps.filter(s =>
              s.toLowerCase().includes(componentName.toLowerCase()) ||
              componentName.toLowerCase().includes(s.toLowerCase())
            );

            if (suggestions.length > 0) {
              console.warn(`   💡 Did you mean one of these?`, suggestions);
            }
          }
        }
      } else {
        console.log(`   ⏭️ Skipped (value is false or empty)`);
      }
    });

    console.log('\n✨ Final active components:', activeComponents);
    console.log(`   Total: ${activeComponents.length} components added`);

    return activeComponents;
  };

  const handleTemplateSelect = async (template: Template) => {
    setLoading(true);
    try {
      console.log('📋 Loading template:', template.name);

      const response = await fetch(`/templates/${template.filename}`);

      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.statusText}`);
      }

      const templateData = await response.json();

      if (templateData.formData) {
        console.log('📦 Template data loaded:', templateData);

        updateFormData(templateData.formData);

        const activeComponents = detectActiveComponents(templateData.formData);

        console.log('🎯 Active components detected:', activeComponents);

        if (onComponentsImport && activeComponents.length > 0) {
          onComponentsImport(activeComponents);
        }

        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'fixed top-4 right-4 z-50 animate-fade-in-up';
        document.body.appendChild(notificationContainer);

        const root = ReactDOM.createRoot(notificationContainer);
        root.render(
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
              <span className="text-2xl">
                {template.icon}
              </span>
                <div>
                  <div className="font-semibold">{template.name}</div>
                  <div className="text-sm opacity-90">{activeComponents.length} componenti attivati</div>
                </div>
              </div>
            </div>
        );

        setTimeout(() => {
          root.unmount();
          notificationContainer.remove();
        }, 3000);

        setIsOpen(false);
      }
    } catch (error) {
      console.error('❌ Error loading template:', error);

      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorNotification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span>Errore nel caricamento del template "${template.name}"</span>
        </div>
      `;
      document.body.appendChild(errorNotification);

      setTimeout(() => {
        errorNotification.remove();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-all justify-center duration-200 text-zinc-100 ${buttonColor.bg} ${buttonColor.hover} border border-${buttonColor.primary}-500 flex items-center gap-2 shadow-lg ${buttonColor.shadow}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Quick start...
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/60 bg-white/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden border border-zinc-300 dark:border-zinc-700">
            <div className={`p-6 border-b border-zinc-300 dark:border-zinc-700 bg-${buttonColor.primary}-900/30`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold text-${buttonColor.primary}-500`}>Seleziona un Template</h2>
                  <p className="text-sm text-zinc-800 dark:text-zinc-400 mt-1">
                    Scegli una configurazione predefinita per iniziare rapidamente
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="text-zinc-800 dark:text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
              <div className="grid gap-4">
                {templates.map((template, index) => (
                    <button
                        key={index}
                        onClick={() => handleTemplateSelect(template)}
                        disabled={loading}
                        className={`p-5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-750 border border-zinc-300 dark:border-zinc-700 hover:border-${buttonColor.primary}-500 rounded-xl transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg ${buttonColor.shadow}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all">
                          {template.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-semibold text-zinc-800 dark:text-zinc-400 group-hover:${buttonColor.text} transition-colors`}>
                            {template.name}
                          </h3>
                          <p className="text-sm text-zinc-800 dark:text-zinc-400 mt-1 line-clamp-2">
                            {template.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {template.components.map((comp, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-900/50 rounded-md border border-zinc-300 dark:border-zinc-700 group-hover:border-${buttonColor.primary}-500/30 transition-colors`}
                                    title={comp.name}
                                >
                              <span className={`${comp.color} text-sm`}>
                                {comp.icon}
                              </span>
                                  <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                                {comp.name}
                              </span>
                                </div>
                            ))}
                          </div>

                          <p className="text-xs text-zinc-500 mt-3 font-mono">
                            📄 {template.filename}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {loading ? (
                              <svg className={`animate-spin h-6 w-6 text-${buttonColor.primary}-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                          ) : (
                              <svg
                                  className={`w-6 h-6 text-zinc-600 group-hover:text-${buttonColor.primary}-500 group-hover:translate-x-1 transition-all`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                          )}
                        </div>
                      </div>
                    </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                    Suggerimento
                  </p>
                  <p className="text-xs text-zinc-800 dark:text-zinc-400 mt-1">
                    Puoi anche importare template personalizzati usando il bottone &quot;Import Config&quot; oppure esportare la tua configurazione attuale per creare nuovi template.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};