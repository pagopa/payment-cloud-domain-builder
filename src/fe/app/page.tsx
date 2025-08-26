"use client";
import React, { useState, useMemo } from 'react';
import { useWizard } from '../hooks/useWizard';
import { Step1 } from '../components/steps/step1';
import { Step2 } from '../components/steps/step2';
import { Step3 } from '../components/steps/step3';
import { ComponentSelector } from '../components/ui/ComponentSelector';
import { StepIndicator } from '../components/ui/StepIndicator';
import { Helper } from '../components/ui/Helper';
import { Modal } from '../components/ui/Modal';
import { ErrorModal } from '../components/ui/ErrorModal';
import { Navbar } from '../components/ui/Navbar';
import { renderTerraformPreview } from '../utils/terraform';
import { triggerGithubWorkflow, ApiResponse } from '../services/api';
import { STEP_COLORS } from '../utils/constants';

export default function Wizard() {
  const {
    step,
    formData,
    showSummary,
    selectedComponents,
    updateFormData,
    handleChange,
    nextStep,
    prevStep,
    goToStep,
    setShowSummary,
    toggleComponent,
    resetWizard
  } = useWizard();

  // Modal states
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [errorDetails, setErrorDetails] = useState<string>('');
  
  // Mode state per la navbar
  const [currentMode, setCurrentMode] = useState<'domain-builder' | 'idh-advisor'>('domain-builder');

  const stepColor = STEP_COLORS[step as keyof typeof STEP_COLORS];

  const handleModeChange = (mode: 'domain-builder' | 'idh-advisor') => {
    setCurrentMode(mode);
    // Qui puoi aggiungere logica per cambiare il contenuto della pagina
    console.log('Mode changed to:', mode);
  };

const handleGenerateWorkflow = async () => {

  if (!formData.domain_name || formData.domain_name.trim() === '') {
    setErrorDetails('Domain name is required before generating the workflow.');
    setShowErrorModal(true);
    return;
  }

  setShowLoadingModal(true);
  setErrorDetails('');

  try {
    const startTime = Date.now();
    const responseData = await triggerGithubWorkflow(formData);
    const duration = Date.now() - startTime;

    setApiResponse({ ...responseData, duration });

    // Simulate a small delay to show loading
    setTimeout(() => {
      setShowLoadingModal(false);
      setShowSuccessModal(true);

      // Auto-close success modal after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 60000);
    }, 2000);

  } catch (error) {
    console.error('Error during workflow generation:', error);
    setShowLoadingModal(false);

    // Set error details for the modal
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;

    setErrorDetails(errorStack || errorMessage);
    setShowErrorModal(true);
  }
};

  const TerraformPreview = () => (
    <div className="p-6 rounded-2xl bg-zinc-800 border border-emerald-800 shadow-inner hover:shadow-emerald-500/10 transition-shadow">
      <h2 className="text-2xl font-semibold text-emerald-400 mb-3">
        Terraform Module Preview (IDH)
      </h2>
      <div className="text-zinc-200 mb-2 text-sm">
        Copy the code below and use it as your IDH module!
      </div>
      <pre className="mt-4 bg-zinc-950 text-green-400 rounded-lg p-4 overflow-auto text-xs border border-zinc-700 whitespace-pre-wrap">
        {renderTerraformPreview(formData)}
      </pre>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded shadow transition-colors"
          onClick={() => setShowSummary(false)}
        >
          Back to wizard
        </button>

        <button
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 group transition-all hover:scale-[1.02] ml-auto"
          onClick={handleGenerateWorkflow}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-spin" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Generate!
        </button>
      </div>
    </div>
  );

  // LAZY Components Selector
  const lazyComponents = useMemo(() => {
  const components: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {};
    
    selectedComponents.forEach(component => {
      const kebabCase = component.toLowerCase().replace(/([A-Z])/g, '-$1');
      console.log(`Creating lazy component for: ${component}`);
      console.log(`Kebab case: ${kebabCase}`);
      console.log(`Import path: ../components/steps/${kebabCase}-step`);
      
      components[component] = React.lazy(async () => {
        const importPath = `../components/steps/${kebabCase}-step`;
        console.log(`Actually importing: ${importPath}`);
        
        try {
          const module = await import(importPath);
          console.log(`Successfully imported ${importPath}:`, Object.keys(module));
          return {
            default: module.default || module[Object.keys(module)[0]]
          };
        } catch (error) {
          console.error(`Failed to import ${importPath}:`, error);
          throw error;
        }
      });
    });
    
    console.log('Created lazy components:', Object.keys(components));
    return components;
  }, [selectedComponents]);

  // Renderizza contenuto diverso in base alla modalità
  const renderContent = () => {
    if (currentMode === 'idh-advisor') {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center p-8 bg-zinc-800 rounded-2xl border border-zinc-700">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">IDH Module Advisor</h2>
            <p className="text-zinc-300 mb-6">Coming soon! This feature will help you choose the best IDH modules for your infrastructure.</p>
            <div className="text-zinc-500">
              🚧 Under development 🚧
            </div>
          </div>
        </div>
      );
    }

    // Domain Builder mode (contenuto originale)
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-3 lg:p-6 mx-auto max-w-10xl mt-8 lg:mt-16">
        {/* Components sidebar */}
        <div className="w-full lg:w-auto">
          <ComponentSelector
            selectedComponents={selectedComponents}
            onToggle={toggleComponent}
            currentStep={step}
          />
        </div>

        {/* Main content */}
        <div className={`p-4 lg:p-6 flex-1 w-full max-w-5xl bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 ${stepColor.shadow} transition-shadow`}>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-4 text-center ${stepColor.text} drop-shadow`}>
            IDH Domain Wizard
          </h1>

          {showSummary ? (
            <TerraformPreview />
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setShowSummary(true); }}>
              <StepIndicator
                currentStep={step}
                totalSteps={3 + selectedComponents.length}
                onStepClick={goToStep}
              />

              {step === 1 && (
                <Step1
                  formData={formData}
                  handleChange={handleChange}
                  onNext={nextStep}
                />
              )}

              {step === 2 && (
                <Step2
                  formData={formData}
                  handleChange={handleChange}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {step === 3 && (
                <Step3
                  formData={formData}
                  handleChange={handleChange}
                  onComplete={() => setShowSummary(true)}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isLastStep={selectedComponents.length === 0}
                />
              )}
              {selectedComponents.map((component, index) => {
                const ComponentStep = lazyComponents[component];
                const isLastStep = index === selectedComponents.length - 1;
                const componentStepNumber = 4 + index;
                const shouldRender = step === componentStepNumber;

                console.log('=== Component Render Debug ===');
                console.log('Component:', component);
                console.log('Index:', index);
                console.log('Component step number:', componentStepNumber);
                console.log('Current step:', step);
                console.log('Should render:', shouldRender);
                console.log('Selected components:', selectedComponents);
                console.log('===============================');

                if (!shouldRender) {
                  console.log(`Skipping ${component} - step mismatch`);
                  return null;
                }

                console.log(`Rendering ${component} at step ${componentStepNumber}`);

                return (
                  <React.Suspense fallback={<div>Loading...</div>} key={component}>
                    <ComponentStep
                      formData={formData}
                      handleChange={handleChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                      updateFormData={updateFormData}
                      currentStep={componentStepNumber}
                      isLastStep={isLastStep}
                      onComplete={isLastStep ? () => setShowSummary(true) : undefined}
                    />
                  </React.Suspense>
                );
              })}
            </form>
          )}
        </div>

        {/* Helper panel */}
        <Helper
          currentStep={step}
          title={`Step ${step} Variables`}
          helpContent={{
            title: `Guida Step ${step}`,
            description: `Configurazione dettagliata per lo step ${step}. Queste variabili sono utilizzabili per la generazione.`,
            tips: [
              "Le variabili sono predefinite e testate",
              "Prega sempre i sistemisti.",
              "Consulta la documentazione per maggiori dettagli"
            ],
            examples: [
              {
                variable: "domain",
                value: "${var.domain}-meme",
                explanation: "Prefisso standard per tutte le risorse PagoPA"
              },
              {
                variable: "env",
                value: "${var.env}",
                explanation: "Ambiente di destinazione per il deployment"
              }
            ]
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Navbar 
        mode={currentMode}
        onModeChange={handleModeChange}
      />
    
      {renderContent()}

      {/* Loading Modal */}
      <Modal
        isOpen={showLoadingModal}
        onClose={() => {}}
        className="max-w-md"
      >
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Generating Workflow...</h3>
          <p className="text-zinc-400">Please wait while we create your GitHub Actions workflow.</p>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        className="max-w-2xl"
      >
        <div className="text-center p-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Workflow Generated Successfully!</h3>
          <p className="text-zinc-400 mb-4">Your GitHub Actions workflow has been created.</p>
          
          {apiResponse && (
            <div className="bg-zinc-800 rounded-lg p-4 text-left">
              <p className="text-sm text-zinc-300 mb-2">Response Details:</p>
              <div className="text-xs text-zinc-400 space-y-1">
                <p>Status: <span className="text-green-400">{apiResponse.status}</span></p>
                <p>Duration: <span className="text-blue-400">{apiResponse.duration}ms</span></p>
                {apiResponse.requestId && <p>Request ID: <span className="text-yellow-400">{apiResponse.requestId}</span></p>}
                {apiResponse.requestId && <p>Branch Name: <span className="text-purple-400">domain-builder-{apiResponse.requestId}-{formData?.domain_name}</span></p>}
                <a
                  href="https://github.com/ffppa/test-runners/actions/workflows/test-wk.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  View workflow on GitHub →
                </a>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowSuccessModal(false)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        details={errorDetails}
        onRetry={handleGenerateWorkflow}
      />
    </>
  );
}