// components/steps/Step1.tsx
import React from 'react';
import { CustomFormData } from '../../types/form';
import { FormButton } from '../ui/FormButton';

interface Step1Props {
  formData: CustomFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  goToLast: () => void;
}

export const Step1: React.FC<Step1Props> = ({ formData, handleChange, onNext, goToLast }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-indigo-400">Step 1: Domain & State</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Domain Name</label>
          <input
            type="text"
            name="domain_name"
            value={formData.domain_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_dev_public"
            checked={formData.is_dev_public}
            onChange={handleChange}
            className="peer w-4 h-4 appearance-none border border-zinc-600 rounded bg-zinc-900 checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-500 transition-colors"
            id="is_dev_public"
          />
          <label htmlFor="is_dev_public" className="text-zinc-300">
            Public DEV environment?
          </label>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Storage Account Name</label>
          <input
            type="text"
            name="storage_account_state_name"
            value={formData.storage_account_state_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. tfmemestgitnsala"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Storage Container Name
          </label>
          <input
            type="text"
            name="storage_account_container_state_name"
            value={formData.storage_account_container_state_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. tfstatesala"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Subscription
          </label>
          <input
            type="text"
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. DEV-PagoPA"
          />
        </div>

        <FormButton
          currentStep="1"
          onNext={onNext}
          goToLast={goToLast}
          isLastStep={false}
        />
      </div>
    </div>
  );
};