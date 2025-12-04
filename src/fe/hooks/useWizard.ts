// hooks/useWizard.ts
import { useState } from 'react';
import { CustomFormData, defaultForm } from '../types/form';
import { formConfig } from '../utils/inputs';

export const useWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CustomFormData>(defaultForm);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    console.log("handleChange:", name, value, type, checked);
    // @ts-ignore
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateFormData = (updates: Partial<CustomFormData>) => {
    // @ts-ignore
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (step < 15) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const goToStep = (targetStep: number) => {
    const maxAllowedStep = 4 + selectedComponents.length;

    if (targetStep >= 1 && targetStep <= maxAllowedStep) {
      setStep(targetStep);
    }
  };

  const goToFirst = () => {
    goToStep(1); // Naviga sempre al primo step
  };

  const goToLast = () => {
    const maxAllowedStep = 3 + selectedComponents.length;
    goToStep(maxAllowedStep); // Naviga all'ultimo step dinamicamente calcolato
  };

  const toggleComponent = (component: string) => {
    setSelectedComponents(prev => {
      const isAdding = !prev.includes(component);
      
      const stepConfig = formConfig.steps[component];
      if (stepConfig && stepConfig.formFields) {
        const hiddenFields = stepConfig.formFields.filter(field => field.type === 'hidden');
        
        const updates: Partial<CustomFormData> = {};
        hiddenFields.forEach(field => {
          // @ts-ignore
          updates[field.key as keyof CustomFormData] = isAdding;
        });
        
        // @ts-ignore
        setFormData(prevData => ({
          ...prevData,
          ...updates
        }));
      }
      
      if (isAdding) {
        return [...prev, component];
      } else {
        return prev.filter(c => c !== component);
      }
    });
  };

  const resetWizard = () => {
    setStep(1);
    setFormData(defaultForm);
    setShowSummary(false);
    setSelectedComponents([]);
  };

  return {
    step,
    formData,
    showSummary,
    selectedComponents,
    handleChange,
    nextStep,
    prevStep,
    goToStep,
    goToFirst,
    goToLast,
    setShowSummary,
    toggleComponent,
    resetWizard,
    updateFormData
  };
};