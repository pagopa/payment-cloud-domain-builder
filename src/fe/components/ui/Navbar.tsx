
// components/ui/Navbar.tsx
import React from 'react';
import { TypewriterText } from './TypewriterText';

interface NavbarProps {
  title?: string;
  subtitle?: string;
  className?: string;
  mode?: 'domain-builder' | 'idh-advisor';
  onModeChange?: (mode: 'domain-builder' | 'idh-advisor') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
                                                title = "IDH",
                                                subtitle = "Infrastructure Design HandBook",
                                                className = "",
                                                mode = 'domain-builder',
                                                onModeChange
                                              }) => {
  const handleModeToggle = (newMode: 'domain-builder' | 'idh-advisor') => {
    if (onModeChange && newMode !== mode) {
      onModeChange(newMode);
    }
  };

  return (
      <header className={`w-full flex items-center justify-between bg-white dark:bg-zinc-950 border-b border-zinc-400 dark:border-zinc-800 px-6 py-3 shadow fixed z-20 top-0 left-0 ${className}`}>
        {/* Logo e titolo */}
        <div className="flex items-center">
          <svg
              className="w-8 h-8 mr-3 text-indigo-800 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 32 32"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
          >
            <path
                d="M10 24a6 6 0 0 1 0-12 7 7 0 0 1 13.9 1.7A5 5 0 1 1 27 24H10z"
                fill="currentColor"
                opacity=".25"
            />
            <path
                d="M16 12a7 7 0 0 1 6.93 6.01A5 5 0 1 1 23 24H11a6 6 0 0 1 .38-12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-indigo-800 dark:text-indigo-200 font-mono drop-shadow">
          {title}: <TypewriterText
              text={subtitle}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={3500}
              className="text-zinc-900 dark:text-zinc-100 font-normal"
          />
        </span>
        </div>

        {/* Contenitore per Theme Toggle e Mode Toggle */}
        <div className="flex items-center gap-4">
          {/* Mode Toggle Switch */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 border border-zinc-300 dark:border-zinc-700">
            <button
                onClick={() => handleModeToggle('domain-builder')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    mode === 'domain-builder'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              Domain Builder
            </button>
            <button
                onClick={() => handleModeToggle('idh-advisor')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    mode === 'idh-advisor'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              IDH Module Advisor
            </button>
          </div>
        </div>
      </header>
  );
};