// components/ui/ErrorModal.tsx
import React from 'react';
import { Modal } from './Modal';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = "Error",
  message,
  details
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="bg-red-800 border-red-600 text-center max-w-lg"
    >
      <div className="mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 8.5c-.77.833-.192 2.5 1.268 2.5z" />
        </svg>
        <p className="text-red-100 mb-4">{message}</p>
        {details && (
          <div className="bg-red-900 border border-red-700 rounded p-3 mb-4 text-left">
            <p className="text-sm text-red-200 mb-2">Details:</p>
            <pre className="text-xs text-red-100 whitespace-pre-wrap break-words">{details}</pre>
          </div>
        )}
      </div>
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};