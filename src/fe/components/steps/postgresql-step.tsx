import React, { useEffect } from 'react';
import { CustomFormData } from '../../types/form';
import { STEP_COLORS } from '../../utils/constants';
import { FormButton } from '../ui/FormButton';

interface PostgreSQLStepProps {
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

const PostgreSQLStep: React.FC<PostgreSQLStepProps> = ({
  currentStep, 
  formData, 
  handleChange, 
  updateFormData,
  isLastStep, 
  onNext, 
  onPrev,
  goToFirst,
  goToLast,
  onComplete,
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

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
            value={''}
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
            value={''}
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
            value={''}
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
            value={''}
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
            value={''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="Enter password"
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
export default PostgreSQLStep;