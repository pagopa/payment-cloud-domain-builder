// components/steps/redis-step.tsx
import React from 'react';
import { FormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';

interface RedisStepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLastStep: boolean;
}

export const RedisStep: React.FC<RedisStepProps> = ({ currentStep, formData, handleChange, onNext, isLastStep, onPrev, onComplete }) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>CosmosDB Configuration</h2>
      <div className="space-y-4">

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">CosmosDB account database type</label>
          <select
            name="cosmosdb_account_database_type"
            value={formData.cosmosdb_account_database_type}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
          >
            <option value="">Select type</option>
              <option key="mongo" value="mongo">
                mongo
              </option>
              <option key="sql" value="sql">
                sql
              </option>
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