"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWizard } from '@/hooks/useWizard';
import { DynamicStep } from '@/components/steps/dynamic-step';
import { ComponentSelector } from '@/components/ui/ComponentSelector';
import { ExportImport } from '@/components/ui/ExportImport';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Helper } from '@/components/ui/Helper';
import { Modal } from '@/components/ui/Modal';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { Navbar } from '@/components/ui/Navbar';
import { TerraformPreview } from '@/components/ui/TerraformPreview';
import { triggerGithubWorkflow, ApiResponse } from '@/services/api';
import { STEP_COLORS } from '@/utils/constants';
import { Login } from '@/components/ui/Login';
import { Logout } from '@/components/ui/Logout';
import { IdhAdvisor } from '@/components/ui/IDHAdvisor';
import { formConfig } from '@/utils/inputs';
import { IDHBuilderTemplates } from '@/components/ui/IDHBuilderTemplates';

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
    goToFirst,
    goToLast,
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

  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    imageUrl: string;
  } | null>(null);

  // Mode state per la navbar
  const [currentMode, setCurrentMode] = useState<'domain-builder' | 'idh-advisor'>('domain-builder');

  const stepColor = STEP_COLORS[step as keyof typeof STEP_COLORS];

  const generatePixelAvatar = (username: string = 'admin') => {
    // Hash per generare pattern consistente
    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    };

    const hash = hashCode(username);

    // Genera colore HSL deterministico
    const hue = hash % 360;
    const saturation = 65 + (hash % 20);
    const lightness = 50 + ((hash >> 8) % 15);
    const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Genera pattern 5x5 (simmetrico)
    const grid: boolean[][] = [];
    for (let i = 0; i < 5; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < 3; j++) {
        // Usa bit dell'hash per determinare se il pixel è attivo
        const bitIndex = i * 3 + j;
        row.push(((hash >> bitIndex) & 1) === 1);
      }
      // Specchia per simmetria (colonne 3 e 4 sono specchiate da 1 e 0)
      grid.push([...row, row[1], row[0]]);
    }

    return { bgColor, grid };
  };

  const handleModeChange = (mode: 'domain-builder' | 'idh-advisor') => {
    setCurrentMode(mode);
    console.log('Mode changed to:', mode);
  };

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const savedProfile = localStorage.getItem('userProfile');

    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error('Errore nel recupero del profilo:', e);
        }
      }
    }
    setIsLoadingAuth(false);
  }, []);

  const handleLoginSuccess = (profile?: { name: string; email: string; imageUrl: string }) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    if (profile) {
      setUserProfile(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem('userProfile');
  };

const handleGenerateWorkflow = async () => {

  if (!formData.domain_name || formData.domain_name.trim() === '') {
    setErrorDetails('Domain name is required before generating the workflow.');
    setShowErrorModal(true);
    return;
  }

  if (!formData.storage_account_state_name || formData.storage_account_state_name.trim() === '') {
    setErrorDetails('State Storage Account Name is required before generating the workflow.');
    setShowErrorModal(true);
    return;
  }

  if (!formData.storage_account_container_state_name || formData.storage_account_container_state_name.trim() === '') {
    setErrorDetails('State Storage Account Container Name is required before generating the workflow.');
    setShowErrorModal(true);
    return;
  }

  if (!formData.storage_account_state_rg_name || formData.storage_account_state_rg_name.trim() === '') {
    setErrorDetails('State Storage Account RG Name is required before generating the workflow.');
    setShowErrorModal(true);
    return;
  }

  if (!formData.subscription || formData.subscription.trim() === '') {
    setErrorDetails('Subscription is required before generating the workflow.');
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

      // // Auto-close success modal after 5 seconds
      // setTimeout(() => {
      //   setShowSuccessModal(false);
      // }, 60000);
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

  const renderContent = () => {
    if (currentMode === 'idh-advisor') {
      return (
          <>
            <IdhAdvisor/>
            {/*<div className="flex justify-center items-center min-h-[60vh]">*/}
            {/*  <div className="text-center p-8 bg-zinc-800 rounded-2xl border border-zinc-700">*/}
            {/*    <h2 className="text-2xl font-bold text-indigo-400 mb-4">IDH Module Advisor</h2>*/}
            {/*    <p className="text-zinc-300 mb-6">Coming soon! This feature will help you choose the best IDH modules*/}
            {/*      for your infrastructure.</p>*/}
            {/*    <div className="text-zinc-500">*/}
            {/*      🚧 Under development 🚧*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </>
      );
    }

    // Domain Builder mode (contenuto originale)
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-3 lg:p-6 mx-auto max-w-10xl mt-8 lg:mt-16 justify-center">
        {/* Components sidebar */}
        <div className="w-full lg:w-auto">
          <div className="flex flex-col flex-1 gap-6 mt-3">
            <IDHBuilderTemplates
                updateFormData={updateFormData}
                onComponentsImport={(components) => {
                  components.forEach(component => {
                    if (!selectedComponents.includes(component)) {
                      toggleComponent(component);
                    }
                  });
                }}
                currentStep={step}
            />
          </div>
          <ComponentSelector
            selectedComponents={selectedComponents}
            onToggle={toggleComponent}
            currentStep={step}
          />
          <div className="mt-3">
            <ExportImport
              formData={formData}
              updateFormData={updateFormData}
              onComponentsImport={(components) => {
                components.forEach(component => {
                  if (!selectedComponents.includes(component)) {
                    toggleComponent(component);
                  }
                });
              }}
            />
          </div>

          <div className="mt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-white/80 dark:bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm';
                modal.innerHTML = `
                  <div class="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                    <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-400 mb-4">Reset Wizard</h3>
                    <p class="text-zinc-600 dark:text-zinc-300 mb-6">Are you sure you want to reset the wizard? All data will be lost.</p>
                    <div class="flex justify-end gap-4">
                      <button class="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:text-white" onclick="this.closest('.fixed').remove()">Cancel</button>
                      <button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded" onclick="this.closest('.fixed').remove(); window.resetWizardConfirmed();">Reset</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
                (window as any).resetWizardConfirmed = () => resetWizard(); /* eslint-disable-line  @typescript-eslint/no-explicit-any */
              }}
              className="w-full mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset Wizard
            </button>
          </div>

          <div className="flex items-center gap-3 mt-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700">
            {userProfile?.imageUrl ? (
              <Image
                  src={userProfile.imageUrl}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-zinc-600"
              />
            ) : (
              (() => {
                const username = userProfile?.name || 'admin';
                const { bgColor, grid } = generatePixelAvatar(username);
                return (
                  <div
                    className="w-10 h-10 rounded-full border-2 border-zinc-600 shadow-lg overflow-hidden"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <div className="w-full h-full p-1 grid grid-cols-5 gap-[1px]">
                      {grid.flat().map((isActive, index) => (
                        <div
                          key={index}
                          className="rounded-[1px]"
                          style={{
                            backgroundColor: isActive ? bgColor : 'transparent'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()
            )}
            <div className="flex flex-col flex-1">
              {userProfile?.name ? (
                <>
                  <span className="text-zinc-600 dark:text-zinc-200 font-medium text-sm">{userProfile.name}</span>
                  <span className="text-zinc-800 dark:text-zinc-400 text-xs">{userProfile.email}</span>
                </>
              ) : (
                <>
                  <span className="text-zinc-600 dark:text-zinc-200 font-medium text-sm">Admin User</span>
                  <span className="text-zinc-800 dark:text-zinc-400 text-xs">Local Account</span>
                </>
              )}
            </div>
          </div>

          {process.env.NEXT_PUBLIC_DISABLE_LOGIN == "true" ? (<></>) : (
            <>
              <Logout onLogout={handleLogout}/>
            </>
          )}
        </div>


        {/* Main content */}
        <div
            className={`p-4 lg:p-6 flex-1 min-w-0 bg-white dark:bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-300 dark:border-zinc-700 ${stepColor.shadow} transition-shadow`}>          {showSummary ? (
            <TerraformPreview
              formData={formData}
              handleGenerateWorkflow={handleGenerateWorkflow}
              setShowSummary={setShowSummary}
            />
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setShowSummary(true); }}>
              <StepIndicator
                currentStep={step}
                totalSteps={defaultSteps.length + selectedComponents.length}
                onStepClick={goToStep}
                stepNames={[
                  ...defaultSteps,
                  ...selectedComponents,
                ]}
              />

            <React.Fragment>
              {/* Rendering degli step di default */}
              {defaultSteps.map((defaultStep, index) => {
                const stepNumber = index + 1; // Gli step di default iniziano con 1
                const isLastStep = index === defaultSteps.length - 1 && selectedComponents.length === 0;
                const shouldRender = step === stepNumber;

                if (!shouldRender) {
                  console.log(`Skipping default step ${defaultStep} - step mismatch`);
                  return null;
                }

                console.log(`Rendering Default Step: ${defaultStep} at step ${stepNumber}`);

                return (
                  <React.Suspense fallback={<div>Loading...</div>} key={defaultStep}>
                    <DynamicStep
                      formData={formData}
                      handleChange={handleChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                      goToFirst={goToFirst}
                      goToLast={goToLast}
                      updateFormData={updateFormData}
                      currentStep={stepNumber}
                      stepName={defaultStep}
                      isLastStep={isLastStep}
                      onComplete={
                        isLastStep ? () => setShowSummary(true) : () => {}
                      }
                    />
                  </React.Suspense>
                );
              })}

              {/* Rendering degli step dinamici */}
              {selectedComponents.map((component, index) => {
                const componentStepNumber = defaultSteps.length + 1 + index;
                const isLastStep = index === selectedComponents.length - 1;
                const shouldRender = step === componentStepNumber;

                if (!shouldRender) {
                  console.log(`Skipping dynamic component ${component} - step mismatch`);
                  return null;
                }

                console.log(`Rendering Dynamic Component: ${component} at step ${componentStepNumber}`);

                return (
                  <React.Suspense fallback={<div>Loading...</div>} key={component}>
                    <DynamicStep
                      formData={formData}
                      handleChange={handleChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                      goToFirst={goToFirst}
                      goToLast={goToLast}
                      updateFormData={updateFormData}
                      currentStep={componentStepNumber}
                      stepName={component}
                      isLastStep={isLastStep}
                      onComplete={
                        isLastStep ? () => setShowSummary(true) : () => {}
                      }
                    />
                  </React.Suspense>
                );
              })}
            </React.Fragment>
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

  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-zinc-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-zinc-800 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  const defaultSteps = Object.keys(formConfig.steps).filter(
    step => (formConfig.steps as Record<string, { default: boolean }>)[step].default
  );


  return (
    <>
      <div>
        {!isLoggedIn && process.env.NEXT_PUBLIC_DISABLE_LOGIN != "true" ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Navbar mode={currentMode} onModeChange={handleModeChange} />
            {renderContent()}
          </>
        )}
      </div>


      {/* Loading Modal */}
      <Modal
        isOpen={showLoadingModal}
        onClose={() => {}}
        className="max-w-md"
      >
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">Generating Workflow...</h3>
          <p className="text-zinc-800 dark:text-zinc-400">Please wait while we create your GitHub Actions workflow.</p>
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
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Workflow Generated Successfully!</h3>
          <p className="text-zinc-800 dark:text-zinc-400 mb-4">Your GitHub Actions workflow has been created.</p>

          {apiResponse && (
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-left">
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">Response Details:</p>
              <div className="text-xs text-zinc-800 dark:text-zinc-400 space-y-1">
                <p>Status: <span className="text-green-400">{apiResponse.status}</span></p>
                <p>Duration: <span className="text-blue-400">{apiResponse.duration}ms</span></p>
                {apiResponse.requestId && <p>Request ID: <span className="text-yellow-400">{apiResponse.requestId}</span></p>}
                {apiResponse.requestId && <p>Branch Name: <span className="text-purple-400">domain-{formData?.domain_name}-{apiResponse.requestId}</span></p>}
                <a
                  href="https://github.com/pagopa/payment-cloud-domain-builder/actions/workflows/domain-builder.yml"
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