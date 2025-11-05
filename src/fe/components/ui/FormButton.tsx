// components/ui/FormButton.tsx
import React from 'react';
import { STEP_COLORS } from '../../utils/constants';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

interface FormButtonProps {
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  currentStep: number;
  isLastStep: boolean;
  goToFirst: () => void; // Callback per andare al primo step
  goToLast: () => void;  // Callback per andare all'ultimo step
}

export const FormButton: React.FC<FormButtonProps> = ({
  isLastStep,
  onNext,
  onPrev,
  onComplete,
  currentStep,
  goToFirst,
  goToLast,
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  return (
    <div className="flex flex-col gap-4 mt-3">
      <div className="flex gap-4 justify-end">
        {/* Pulsante "Vai al primo step" */}
        {currentStep > 1 && (
          <button
            type="button"
            onClick={goToFirst}
            className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-700 hover:bg-zinc-600 transition text-zinc-600 dark:text-zinc-200 px-3 py-1 rounded w-fit text-sm"
          >
            <AiOutlineDoubleLeft className="text-base" />
          </button>
        )}

        {/* Pulsante Back */}
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrev}
            className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition text-zinc-600 dark:text-zinc-200 px-4 py-2 rounded w-1/2"
          >
            Back
          </button>
        )}

        {/* Pulsante Next o Complete */}
        {isLastStep ? (
          <button
            type="button"
            onClick={onComplete}
            className={`${stepColor.bg} hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2`}
          >
            Preview IDH Domain
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

        {/* Pulsante "Vai all'ultimo step" */}
        {!isLastStep && (
          <button
            type="button"
            onClick={goToLast}
            className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-700 hover:bg-zinc-600 transition text-zinc-600 dark:text-zinc-200 px-3 py-1 rounded w-fit text-sm"
          >
            <AiOutlineDoubleRight className="text-base" />
          </button>
        )}
      </div>
    </div>
  );
};