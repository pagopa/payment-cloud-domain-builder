// hooks/useWizard.ts
import { useState } from 'react';
import { FormData, defaultForm } from '../types/types';

export const useWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    const maxAllowedStep = 3 + selectedComponents.length;

    if (targetStep >= 1 && targetStep <= maxAllowedStep) {
      setStep(targetStep);
    }
  };

  const toggleComponent = (component: string) => {
    setSelectedComponents(prev => {
      if (prev.includes(component)) {
        return prev.filter(c => c !== component);
      } else {
        return [...prev, component];
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
    setShowSummary,
    toggleComponent,
    resetWizard
  };
};