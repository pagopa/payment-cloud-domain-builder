// components/steps/Step3.tsx
import React from 'react';
import { CustomFormData } from '../../types/form';
import { LOCATIONS } from '../../utils/constants';
import { FormButton } from '../ui/FormButton';

interface Step3Props {
  formData: CustomFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPrev: () => void;
  onComplete: () => void;
  onNext: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  isLastStep: boolean;
}

export const Step3: React.FC<Step3Props> = ({
    formData,
    handleChange,
    onPrev,
    onNext,
    goToFirst,
    goToLast,
    onComplete,
    isLastStep
  }) => {
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
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Priavete endpoint subnet name</label>
          <input
            type="text"
            name="private_endpoint_subnet_name"
            value={''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. ${local.prefix}-${var.env_short}-common-private-endpoint-snet"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Private endpoint subnet resource group name</label>
          <input
            type="text"
            name="private_endpoint_subnet_rg_name"
            value={''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. ${local.prefix}-${var.env_short}-vnet-rg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Private endpoint subnet vnet name</label>
          <input
            type="text"
            name="private_endpoint_subnet_vnet_name"
            value={''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. ${local.prefix}-${var.env_short}-vnet"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Private link dns zone rg name</label>
          <input
            type="text"
            name="private_dns_zone_rg_name"
            value={''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. ${local.prefix}-${var.env_short}-vnet-rg"
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

          <FormButton
            currentStep="3"
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