'use client';

import type React from 'react';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (inputRef.current && inputRef.current.value.trim()) {
      setIsLoading(true);
      const query = encodeURIComponent(inputRef.current.value.trim());
      router.push(`/ai-chat?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full overflow-hidden rounded-full border-2 border-purple-200 shadow-sm transition-shadow duration-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-300/50 hover:shadow-md">
        <input
          ref={inputRef}
          type="text"
          placeholder="Describe el regalo que buscas..."
          className="flex-1 p-3.5 text-gray-700 placeholder-gray-400 outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3 text-white transition-all duration-300 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
