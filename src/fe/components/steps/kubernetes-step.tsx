import React, { useEffect } from 'react';
import { CustomFormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';
import { FormButton } from '../ui/FormButton';

interface KubernetesStepProps {
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
}

const KubernetesStep: React.FC<KubernetesStepProps> = ({
  currentStep, 
  formData, 
  handleChange, 
  updateFormData,
  isLastStep, 
  onNext, 
  onPrev,
  goToFirst,
  goToLast,
  onComplete 
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

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
    </div>
  );
};
export default KubernetesStep;