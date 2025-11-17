'use client';

import { useAppContext } from '@/context/app';
import Image from 'next/image';
import React from 'react';

export const TypingIndicator: React.FC = () => {
  const { agent } = useAppContext();

  return (
    <div className="flex gap-3 mb-6 animate-fadeIn">
      {/* Agent Avatar */}
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg overflow-hidden">
          {agent?.logo ? (
            <Image
              src={agent.logo.publicUrl}
              alt={agent.name || 'Agent'}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">AI</span>
          )}
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex flex-col items-start max-w-[75%]">
        <div className="text-xs text-gray-400 mb-1 px-1">{agent?.name || 'AI Assistant'}</div>
        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg border border-gray-700">
          <div className="flex gap-1.5">
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
