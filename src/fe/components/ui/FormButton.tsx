// components/ui/FormButton.tsx
import React from 'react';
import { STEP_COLORS } from '../../utils/constants';

interface FormButtonProps {
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  currentStep: number;
}

export const FormButton: React.FC<FormButtonProps> = ({
  isLastStep,
  onNext,
  onPrev,
  onComplete,
  currentStep
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  return (
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
  );
};