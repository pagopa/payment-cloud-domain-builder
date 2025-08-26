// components/ui/StepIndicator.tsx
import React from "react";
import { STEP_COLORS } from "../../utils/constants";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  stepNames: string[]; // Nomi degli step (componenti)
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  stepNames,
}) => {
  return (
    <div className="mb-6 flex items-center justify-center gap-4 flex-wrap">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => {
        const stepColor = STEP_COLORS[stepNumber as keyof typeof STEP_COLORS]; // Recupera i colori per lo step

        return (
          <div
            key={stepNumber}
            onClick={() => onStepClick(stepNumber)}
            style={{ cursor: "pointer" }}
            className={`group flex items-center gap-4 px-4 py-2 rounded-full border transition-all
              ${
                currentStep === stepNumber
                  ? `${stepColor.bg} text-white border-transparent scale-105`
                  : `border-${stepColor.primary}-500 bg-zinc-800 text-zinc-300 hover:${stepColor.hover}`
              }
            `}
            title={`Step ${stepNumber}: ${stepNames[stepNumber - 1] || ""}`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                ${
                  currentStep === stepNumber
                    ? "bg-white text-zinc-900"
                    : `${stepColor.bg} text-white`
                }
              `}
            >
              {stepNumber}
            </div>
            <span className="text-sm font-medium">{stepNames[stepNumber - 1]}</span>
          </div>
        );
      })}
    </div>
  );
};