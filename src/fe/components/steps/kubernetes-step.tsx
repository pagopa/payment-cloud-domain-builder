import React, { useEffect } from 'react';
import { FormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';

interface KubernetesStepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateFormData?: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  currentStep: number;
}

export const KubernetesStep: React.FC<PostgreSQLStepProps> = ({
  currentStep, 
  formData, 
  handleChange, 
  updateFormData,
  isLastStep, 
  onNext, 
  onPrev, 
  onComplete 
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  // Aggiorna include_postgresql basandosi sul campo database
  useEffect(() => {
    if (updateFormData) {
      const hasDatabase = formData.database && formData.database.trim() !== '';
      updateFormData({ include_postgresql: hasDatabase });
    }
  }, [formData.database, updateFormData]);

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>Kubernetes Configuration</h2>
      <div className="space-y-4">
        {/* Campo nascosto per include_kubernetes */}
        <input
          type="hidden"
          name="include_kubernetes"
          value={formData.include_kubernetes ? 'true' : 'false'}
        />

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">AKS name</label>
          <input
            type="text"
            name="aks_name"
            value={formData.aks_name || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. ${local.prefix}-${var.env_short}-${var.location_short}-${var.env}-aks"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">AKS Resource Group name</label>
          <input
            type="text"
            name="aks_rg_name"
            value={formData.aks_rg_name || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. ${local.prefix}-${var.env_short}-${var.location_short}-${var.env}-aks-rg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Ingress load balancer IP</label>
          <input
            type="text"
            name="ingress_load_balancer_ip"
            value={formData.ingress_load_balancer_ip || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. 10.1.100.250"
          />
        </div>


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