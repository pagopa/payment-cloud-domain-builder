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
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>Redis Configuration</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Host</label>
          <input
            type="text"
            name="redis_host"
            value={formData.redis_host || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. localhost"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Port</label>
          <input
            type="number"
            name="redis_port"
            value={formData.redis_port || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. 6379"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Database Number</label>
          <input
            type="number"
            name="redis_db"
            value={formData.redis_db || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. 0"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Password</label>
          <input
            type="password"
            name="redis_password"
            value={formData.redis_password || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="Enter password (optional)"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="redis_ssl"
            checked={formData.redis_ssl || false}
            onChange={handleChange}
            className="peer w-4 h-4 appearance-none border border-zinc-600 rounded bg-zinc-900 checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-500 transition-colors"
            id="redis_ssl"
          />
          <label htmlFor="redis_ssl" className="text-zinc-300">
            Enable SSL/TLS
          </label>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">Connection Timeout (seconds)</label>
          <input
            type="number"
            name="redis_timeout"
            value={formData.redis_timeout || ''}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. 30"
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