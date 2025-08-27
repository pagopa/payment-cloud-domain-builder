import React, { useEffect, useState } from 'react';
import { CustomFormData } from '../../types/form';
import { formConfig } from "../../utils/inputs";

import { STEP_COLORS } from '../../utils/constants';
import { FormButton } from '../ui/FormButton';
// import { parseYamlWithComments } from "../../utils/parsing";

const config = {
  include_postgresql: true,
  form_fields: [
    { name: "Postgres Host", type: "text", placeholder: "e.g. localhost" },
    { name: "Postgres Port", type: "number", placeholder: "e.g. 5432" },
    { name: "Variabile Dinamica", type: "text", placeholder: "e.g. Sono dynamo" },
    { name: "Trallallero Trallalla", type: "text", placeholder: "e.g. Trulilolli" },
  ],
};

interface DynamicStepProps {
  formData: CustomFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateFormData?: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  currentStep: number;
  stepName: string;
}

export const DynamicStep: React.FC<DynamicStepProps> = ({
    currentStep,
    formData,
    handleChange,
    updateFormData,
    isLastStep,
    onNext,
    onPrev,
    goToFirst,
    goToLast,
    onComplete,
    stepName
  }) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];
  const [config, setConfig] = useState<Record<string, Record<string, any>> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const stepConfig = formConfig.steps[stepName.toLowerCase().replace(/\s+/g, "_")];

  if (!stepConfig || !stepConfig.include) {
    return (
      <div className="p-4 rounded-lg bg-red-600 text-white text-center shadow-md">
        <h3 className="text-lg font-bold">Component Not Found</h3>
        <p className="text-sm">
          The component {stepName} could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>{stepName.toUpperCase()} Configuration</h3>
        {stepConfig.formFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-semibold">{field.name}</label>
            <input
              type={field.type}
              name={field.name.toLowerCase().replace(/\s+/g, "_")}
              value={formData[field.name.toLowerCase().replace(/\s+/g, "_")] || ''}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            />
          </div>
        ))}

        <FormButton
          currentStep={currentStep}
          onNext={onNext}
          onPrev={onPrev}
          goToFirst={goToFirst}
          goToLast={goToLast}
          onComplete={onComplete}
          isLastStep={isLastStep}
        />
      </div>
  );
};
