// components/ui/StepIndicator.tsx
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  onStepClick
}) => {
  return (
    <div className="mb-8 flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNumber => (
        <div
          key={stepNumber}
          style={{ cursor: 'pointer' }}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-bold shadow-md transition
            ${
              currentStep === stepNumber
                ? "border-white-400 bg-white-500/20 text-white-100 scale-110"
                : "border-zinc-600 bg-zinc-800 text-zinc-500"
            }`}
          title={`Passo ${stepNumber}`}
          onClick={() => onStepClick(stepNumber)}
        >
          {stepNumber}
        </div>
      ))}
    </div>
  );
};