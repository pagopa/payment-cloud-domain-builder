import { CustomFormData } from '../../types/form';
import { formConfig } from "../../utils/inputs";

import { STEP_COLORS } from '../../utils/constants';
import { FormButton } from '../ui/FormButton';

interface DynamicStepProps {
  formData: CustomFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  updateFormData?: (updates: Partial<CustomFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  currentStep: number;
  stepName: string;
}

export const DynamicStep: React.FC<DynamicStepProps> = ({
    currentStep,
    formData,
    handleChange,
    isLastStep,
    onNext,
    onPrev,
    goToFirst,
    goToLast,
    onComplete,
    stepName
  }) => {
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  const stepNameKey = stepName.toLowerCase().replace(/\s+/g, "_");
  const stepConfig = formConfig.steps[stepNameKey];
  const inputClasses = {
    text: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none",
    number: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none",
    checkbox: `
      w-6 h-6 appearance-none border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-md flex items-center justify-center
      checked:bg-${stepColor.bg}-500 checked:border-${stepColor.border}-500 focus:ring-2 focus:ring-${stepColor.primary}-500 hover:border-${stepColor.border}-400 transition-all peer
    `,
    radio: `
      w-4 h-4 appearance-none border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-full
      checked:bg-gradient-to-r checked:from-indigo-500 checked:to-purple-500 checked:border-none
      focus:ring-2 focus:ring-indigo-400 hover:border-indigo-400 transition-all
      flex-shrink-0
    `,
    select: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500",
    textarea: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-yellow-500 focus:outline-none",
    password: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none",
    date: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-teal-500 focus:outline-none",
    file: "w-full p-2 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-700 file:text-zinc-900 dark:text-zinc-100 hover:file:bg-indigo-600",
  };

  const renderInputField = (field, value, handleChange) => {
    switch (field.type) {
      case "select":
        return (
          <select
            name={field.key}
            value={value || ""}
            onChange={handleChange}
            className={inputClasses.select}
          >
            <option value="">Seleziona un&apos;opzione</option>
            {field.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={field.key}
            rows={4}
            value={value || ""}
            placeholder={field.placeholder}
            onChange={handleChange}
            className={inputClasses.textarea}
          />
        );
      case "hidden":
        return (
          <input
            type="hidden"
            name={field.key}
            value={value !== undefined ? String(value) : (field.value || "true")}
          />
        );
      case "static":
        return (
            <input
                type="hidden"
                name={field.key}
                value={field.value || true}
            />
        );
      case "radio":
        return (
          <div className="flex items-center space-x-4">
            {field.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center mt-3 justify-center px-4 py-2 rounded-lg border
                  ${
                    value === option.value
                      ? "bg-indigo-500 border-indigo-500 text-white shadow-lg"
                      : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-indigo-500"
                  }
                  transition-all cursor-pointer hover:shadow-md`}
              >
                <input
                  type="radio"
                  name={field.key}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="hidden"
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "boolean":
        return (
          <label
            htmlFor={field.key}
            className="flex items-center gap-4 cursor-pointer mt-2"
          >
            <div className="relative">
              <input
                type="checkbox"
                name={field.key}
                defaultChecked={field.value}
                onChange={handleChange}
                className={inputClasses.checkbox}
                id={field.key}
              />
              {/* Spunta */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute w-4 h-4 text-zinc-600 dark:text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className={`text-sm text-zinc-600 dark:text-zinc-300 peer-checked:text-${stepColor.text}-500`}>
              {field.label}
            </span>
          </label>
        );
      case "checkboxgroup":
        return (
            <div className="flex flex-wrap gap-4">
              {field.options.map((option, index) => {
                const isChecked = Array.isArray(value) && value.includes(option.value);
                
                return (
                  <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="relative">
                      <input
                          type="checkbox"
                          name={field.key}
                          value={option.value}
                          checked={isChecked}
                          onChange={(e) => {
                            const currentValues = Array.isArray(value) ? value : [];
                            let newValues;
                            
                            if (e.target.checked) {
                              newValues = [...currentValues, option.value];
                            } else {
                              newValues = currentValues.filter(v => v !== option.value);
                            }
                            
                            const syntheticEvent = {
                              target: {
                                name: field.key,
                                value: newValues,
                                type: 'checkboxgroup'
                              }
                            } as React.ChangeEvent<HTMLInputElement>;
                            
                            handleChange(syntheticEvent);
                          }}
                          className={inputClasses.checkbox}
                      />
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`absolute w-4 h-4 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity ${
                            isChecked ? 'opacity-100' : 'opacity-0'
                          }`}
                      >
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className={`text-sm transition-colors ${
                      isChecked ? 'text-'+stepColor.text+'-500' : 'text-zinc-600 dark:text-zinc-300'
                    }`}>
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
        );
        default:
        return (
          <input
            type={field.type}
            name={field.key}
            value={value || ""}
            placeholder={field.placeholder}
            onChange={handleChange}
            className={inputClasses[field.type] || inputClasses.text}
          />
        );
    }
  };


  if (!stepConfig) {
    return (
      <div className="p-4 rounded-lg bg-red-600 text-white text-center shadow-md">
        <h3 className="text-lg font-bold">Component Not Found</h3>
        <p className="text-sm">
          The component {stepName} could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-2 ${stepColor.text}`}>Configurazione {formConfig.steps[stepName.toLowerCase()].name}</h2>
      <div className="space-y-4">
        {stepConfig.formFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-semibold text-zinc-600 dark:text-white mt-2">{(field.type !== 'hidden' && field.type !== 'static') && field.name}</label>
          {renderInputField(
            field,
            formData[field.key],
            handleChange
          )}
          </div>
        ))}

        {stepConfig.formFields.length <= 1 ?
            <div className={`p-4 rounded-lg bg-zinc-500 text-white text-center shadow-md`}>
                <p className="text-sm">
                  Nulla da definire in questo step :)
                </p>
            </div> : ""
        }

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
