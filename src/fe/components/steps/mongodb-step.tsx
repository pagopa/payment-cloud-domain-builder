// components/steps/postgresql-step.tsx
import React from 'react';
import { FormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';


interface PostgreSQLStepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLastStep: boolean;
}

export const PostgreSQLStep: React.FC<PostgreSQLStepProps> = ({ currentStep, formData, handleChange, isLastStep, onNext, onPrev, onComplete }) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>MongoDB Configuration</h2>
      <div className="space-y-4">
        <div className="flex gap-4 mt-3">
          <button
            type="button"
            onClick={onPrev}
            className="bg-zinc-700 hover:bg-zinc-600 transition text-zinc-200 px-4 py-2 rounded w-1/2"
          >
            Back
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={onComplete}
              className={`${stepColor.bg} hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2`}
            >
              Generate IDH Domain
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className={`${stepColor.bg} hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};