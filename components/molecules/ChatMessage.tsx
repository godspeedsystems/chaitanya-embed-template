'use client';

import React from 'react';
import { Message } from '@/app/page';
import { MarkdownRenderer } from './MarkdownRenderer';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
  agentIcon?: string;
  agentName?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, agentIcon, agentName }) => {
  const isUser = message.role === 'user';

  if (!message.content) return null;

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
            U
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg overflow-hidden">
            {agentIcon ? (
              <Image
                src={agentIcon}
                alt={agentName || 'Agent'}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm">AI</span>
            )}
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        {/* Name */}
        <div className={`text-xs text-gray-400 mb-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'You' : agentName || 'AI Assistant'}
        </div>

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-lg ${
            isUser
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm'
              : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700'
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          ) : (
            <div className="text-sm">
              <MarkdownRenderer content={message.content} />
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};
