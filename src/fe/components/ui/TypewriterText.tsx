"use client";
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
                                                                text,
                                                                typingSpeed = 100,
                                                                deletingSpeed = 50,
                                                                pauseDuration = 2000,
                                                                className = ''
                                                              }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        return;
      }

      const timer = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingSpeed);

      return () => clearTimeout(timer);
    } else {
      if (displayText.length === text.length) {
        setIsPaused(true);
        return;
      }

      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [displayText, isDeleting, isPaused, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
      <span className={`inline-block ${className}`}>
      {displayText}
        <span className="animate-blink border-r-2 border-indigo-400 ml-0.5"></span>
    </span>
  );
};