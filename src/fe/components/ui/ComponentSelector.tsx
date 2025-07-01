// components/ui/ComponentSelector.tsx
import React from 'react';
import { COMPONENTS, STEP_COLORS } from '../../utils/constants';

interface ComponentSelectorProps {
  selectedComponents: string[];
  onToggle: (component: string) => void;
  currentStep: number;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  selectedComponents,
  onToggle,
  currentStep
}) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 w-72 border border-zinc-700 h-fit">
      <h2 className="text-xl font-bold text-zinc-200 mb-4">Add Components</h2>
      <div className="space-y-3">
        {COMPONENTS.map(component => (
          <div key={component} className="relative flex items-center">
            <input
              type="checkbox"
              id={component}
              checked={selectedComponents.includes(component)}
              onChange={() => {
                console.log('Toggling component:', component); // Debug log
                onToggle(component);
              }}
              className={`peer w-4 h-4 appearance-none border border-zinc-600 rounded bg-zinc-900 ${stepColor.border} transition-colors`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-4 h-4 text-white pointer-events-none peer-checked:block hidden" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <label htmlFor={component} className="ml-3 text-zinc-300 cursor-pointer select-none">
              {component}
            </label>
          </div>
        ))}
      </div>

      {selectedComponents.length > 0 && (
        <div className="mt-4 p-3 bg-zinc-800 rounded border border-zinc-600">
          <p className="text-sm text-zinc-400 mb-2">Selected ({selectedComponents.length}):</p>
          <div className="flex flex-wrap gap-1">
            {selectedComponents.map(comp => (
              <span key={comp} className="text-xs bg-zinc-700 text-zinc-200 px-2 py-1 rounded">
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};