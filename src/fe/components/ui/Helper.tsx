import React, { useState } from 'react';
import { STEP_COLORS } from '../../utils/constants';
import { Modal } from './Modal'; // Assumendo che tu abbia già il componente Modal

interface HelperProps {
  title: string;
  variables?: { source: string, name: string; description: string }[] | undefined;
  currentStep: number;
  helpContent?: {
    title: string;
    description: string;
    tips?: string[];
    examples?: { variable: string; value: string; explanation: string }[];
  };
}

export const Helper: React.FC<HelperProps> = ({
  title = 'Helper',
  variables = [
    {
      name: 'prefix',
      source: 'local',
      description: 'e.g pagopa'
    },
    {
      name: 'env_short',
      source: 'var',
      description: 'e.g p'
    },
    {
      name: 'env',
      source: 'var',
      description: 'e.g prod'
    },
    {
      name: 'domain',
      source: 'local',
      description: 'e.g core'
    },
    {
      name: 'location',
      source: 'var',
      description: 'e.g italynorth'
    },
    {
      name: 'location_string',
      source: 'var',
      description: 'e.g Italy North'
    },
    {
      name: 'location_short',
      source: 'var',
      description: 'e.g itn'
    },
    {
        name: 'product',
        source: 'local',
        description: 'e.g ${local.prefix}-${var.env_short}'
    },
    {
        name: 'project_short',
        source: 'local',
        description: 'e.g ${local.prefix}-${var.env_short}-${local.domain}'
    },
    {
        name: 'project',
        source: 'local',
        description: 'e.g ${local.prefix}-${var.env_short}-${var.location_short}-${local.domain}'
    }
  ],
  currentStep,
  helpContent = {
    title: "Guida alle Variabili",
    description: "Queste sono le variabili disponibili per questo step. Utilizza questi valori nella configurazione del tuo progetto.",
    tips: [
      "Tutte le variabili sono predefinite e ottimizzate per l'ambiente PagoPA",
      "Non è necessario modificare questi valori manualmente",
      "Le variabili si aggiornano automaticamente in base alle tue selezioni"
    ]
  }
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const stepColor = STEP_COLORS[currentStep as keyof typeof STEP_COLORS];

  const [inputValue, setInputValue] = useState('');

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedValue = e.dataTransfer.getData('text/plain');

    if (droppedValue) {
      setInputValue(prevValue => {
        const newValue =
          prevValue && prevValue.trim() !== ''
            ? `${prevValue}-${droppedValue}`
            : droppedValue;
      return newValue;
    });
  }
};

const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDragEnter = (e: React.DragEvent<HTMLTextAreaElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-lg font-semibold ${stepColor?.text || 'text-zinc-600 dark:text-zinc-200'}`}>
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-2 cursor-pointer text-zinc-800 dark:text-zinc-400 hover:text-blue-400 transition-colors group"
            title="Apri Guida"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">Aiuto</span>
          </button>
        </div>

        <div className="space-y-2">
          {variables.map((variable, index) => (
            <div
              key={index}
              className="border-b cursor-pointer border-zinc-300 dark:border-zinc-700 pb-2 last:border-0"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', "${"+variable.source+"."+variable.name+"}");
              }}
            >
              <span className={`${stepColor.text} font-mono`}>{variable.name}</span>
              <p className="text-sm text-zinc-800 dark:text-zinc-400">{variable.description}</p>
            </div>
          ))}
        </div>
        
        {/* Input posizionato sotto le variabili */}
        <div className="mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-700">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            className="w-full border border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[80px]"
            placeholder="Trascina qui le variabili per comporre..."
            rows={3}
          />
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        className="max-w-3xl w-[95vw] my-8"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
                {helpContent.title}
              </h2>
            </div>
            <button
              onClick={() => setShowHelpModal(false)}
              className="text-zinc-800 dark:text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {helpContent.description}
              </p>
            </div>

            {/* Tips Section */}
            {helpContent.tips && helpContent.tips.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Suggerimenti
                </h3>
                <ul className="space-y-2">
                  {helpContent.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-zinc-600 dark:text-zinc-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variables Table */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Variabili Disponibili
              </h3>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  {variables.map((variable, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-b border-zinc-300 dark:border-zinc-700 last:border-0 hover:bg-zinc-750"
                    >
                      <div className="flex-1">
                        <code className={`${stepColor.text} font-mono text-sm`}>
                          {variable.name}
                        </code>
                      </div>
                      <div className="flex-2 ml-4">
                        <span className="text-zinc-600 dark:text-zinc-300 text-sm">
                          {variable.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Examples Section */}
            {helpContent.examples && helpContent.examples.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Esempi di Utilizzo
                </h3>
                <div className="space-y-3">
                  {helpContent.examples.map((example, index) => (
                    <div key={index} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-purple-400 font-mono text-sm">
                          {example.variable}
                        </code>
                        <span className="text-zinc-500">=</span>
                        <code className="text-green-400 font-mono text-sm">
                          &quot;{example.value}
                        </code>
                      </div>
                      <p className="text-zinc-800 dark:text-zinc-400 text-xs">
                        {example.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-6 border-t border-zinc-300 dark:border-zinc-700 mt-6">
            <button
              onClick={() => setShowHelpModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ho capito
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};