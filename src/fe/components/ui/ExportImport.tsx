import React from 'react';

export const ExportImport: React.FC = () => {
  const handleImport = () => {
    // TODO: Implement import logic
  };

  const handleExport = () => {
    // TODO: Implement export logic
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleImport}
        className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Import Config
      </button>
      <button
        onClick={handleExport}
        className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export Config
      </button>
    </div>
  );
};