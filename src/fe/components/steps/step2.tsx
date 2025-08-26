// components/steps/Step2.tsx
import React from 'react';
import { CustomFormData } from '../../types/form';

interface Step2Props {
  formData: CustomFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2: React.FC<Step2Props> = ({ formData, handleChange, onNext, onPrev }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-emerald-400">Step 2: Monitoring</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Log Analytics Workspace Name
          </label>
          <input
            type="text"
            name="log_analytics_ws_name"
            value={formData.log_analytics_ws_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-law"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Workspace Resource Group
          </label>
          <input
            type="text"
            name="log_analytics_ws_rg_name"
            value={formData.log_analytics_ws_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-monitor-rg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor Resource Group Name
          </label>
          <input
            type="text"
            name="monitor_rg_name"
            value={formData.monitor_rg_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-rg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor Action Group Slack Name
          </label>
          <input
            type="text"
            name="monitor_action_group_slack_name"
            value={formData.monitor_action_group_slack_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-action-group-slack"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor Action Group Email Name
          </label>
          <input
            type="text"
            name="monitor_action_group_email_name"
            value={formData.monitor_action_group_email_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-action-group-email"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-zinc-300">
            Monitor Action Group Opsgenie Name
          </label>
          <input
            type="text"
            name="monitor_action_group_opsgenie_name"
            value={formData.monitor_action_group_opsgenie_name}
            onChange={handleChange}
            className="w-full p-2 border bg-zinc-900 border-zinc-700 rounded text-zinc-100"
            placeholder="e.g. meme-action-group-opsgenie"
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
          <button
            type="button"
            onClick={onNext}
            className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-4 py-2 rounded w-1/2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};