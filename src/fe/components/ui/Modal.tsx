import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = 'max-w-md w-full mx-4'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative bg-zinc-100 dark:bg-zinc-800 border border-zinc-600 text-white shadow-xl rounded-lg p-8 ${className}`}>
        {title && <h2 className="text-xl text-zinc-800 dark:text-zinc-400 font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};