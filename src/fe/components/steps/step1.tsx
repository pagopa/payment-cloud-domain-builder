// components/steps/Step1.tsx
import React from 'react';
import { FormData } from '../../types/form';

interface Step1Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({ formData, handleChange, onNext }) => {
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

        <button
          type="button"
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded w-full mt-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};