'use client';

import type React from 'react';

import { useEffect } from 'react';

export default function HowItWorksButton() {
  useEffect(() => {
    // Añadir scroll-margin-top al elemento how-it-works
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.style.scrollMarginTop = '100px';
    }
  }, []);

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      const y = howItWorksSection.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToHowItWorks}
      className="mt-4 flex items-center gap-1 font-medium text-purple-600 transition-colors duration-200 hover:text-purple-800"
    >
      ¿Cómo funciona?
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
