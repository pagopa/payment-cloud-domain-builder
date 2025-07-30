import React, { useEffect } from 'react';
import { FormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';

interface GenericStepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateFormData?: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  currentStep: number;
  stepConf: array;
  stepName: string;
}

export const GenericStep: React.FC<GenericStepProps> = ({
  currentStep, 
  formData, 
  handleChange, 
  updateFormData,
  isLastStep, 
  onNext, 
  onPrev, 
  onComplete,
  stepConf,
  stepName
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  // Aggiorna include_component basandosi sul campo database
  useEffect(() => {
    if (updateFormData) {
      const hasDatabase = formData.database && formData.database.trim() !== '';
      updateFormData({ include_postgresql: hasDatabase }); //todo include_stepName
    }
  }, [formData.database, updateFormData]);

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>{stepConf.description}</h2>
      <div className="space-y-4">

        {stepConf.fields.map((field, index) => (
            field.type == 'string' ? (
                <div>
                  <label className="block mb-1 text-sm font-semibold text-zinc-300">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
                    placeholder={field.placeholder}
                  />
                </div>
            ) : ()
          ))}

        <div className="flex gap-4 mt-3">
          <button
            type="button"
            onClick={onPrev}
            className="bg-zinc-700 hover:bg-zinc-600 transition text-zinc-200 px-4 py-2 rounded w-1/2">
            Back
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={onComplete}
              className={`${stepColor.bg} hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2`}>
              Generate IDH Domain
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className={`${stepColor.bg} hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2`}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};