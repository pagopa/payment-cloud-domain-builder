// components/steps/Step3.tsx
import React from 'react';
import { FormData } from '../../types/form';
import { LOCATIONS } from '../../utils/constants';

interface Step3Props {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPrev: () => void;
  onComplete: () => void;
  onNext: () => void;
  isLastStep: boolean;
}

export const Step3: React.FC<Step3Props> = ({ formData, handleChange, onPrev, onNext, onComplete, isLastStep }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-pink-400">Step 3: Networking & Others</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Managed Identity Resource Group</label>
          <input
            type="text"
            name="azdo_managed_identity_rg_name"
            value={formData.azdo_managed_identity_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-azdo-managed-identity-rg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            IAC Prefix Identity
          </label>
          <input
            type="text"
            name="azdo_managed_identity_iac_prefix"
            value={formData.azdo_managed_identity_iac_prefix}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder='e.g. azdo-${var.env}-pagopa-iac'
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Virtual Network Name</label>
          <input
            type="text"
            name="vnet_name"
            value={formData.vnet_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-vnet"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Virtual Network Resource Group</label>
          <input
            type="text"
            name="vnet_rg_name"
            value={formData.vnet_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-vnet-rg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. pagopa"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
          >
            <option value="">Select location</option>
            {LOCATIONS.map(location => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
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
              className="bg-pink-600 hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2"
            >
              Generate IDH Domain
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="bg-pink-600 hover:bg-pink-700 transition text-white px-4 py-2 rounded w-1/2"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};