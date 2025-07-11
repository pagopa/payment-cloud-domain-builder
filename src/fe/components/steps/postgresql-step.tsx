import React, { useEffect } from 'react';
import { FormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';

interface PostgreSQLStepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateFormData?: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  currentStep: number;
}

export const PostgreSQLStep: React.FC<PostgreSQLStepProps> = ({ 
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
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>PostgreSQL Configuration</h2>
      <div className="space-y-4">
        {/* Campo nascosto per include_postgresql */}
        <input
          type="hidden"
          name="include_postgresql"
          value={formData.include_postgresql ? 'true' : 'false'}
        />

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Host</label>
          <input
            type="text"
            name="host"
            value={formData.host || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. localhost"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Port</label>
          <input
            type="number"
            name="port"
            value={formData.port || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. 5432"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Database Name</label>
          <input
            type="text"
            name="database"
            value={formData.database || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. myapp_db"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. postgres"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="Enter password"
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