'use client';

import { useAppContext } from '@/context/app';
import env from '@/env';
import { useSocket } from '@/hooks/useSocket';
import { RootState, store } from '@/store';
import { connectSocket } from '@/store/socketSlice';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ChatMessage } from '@/components/molecules/ChatMessage';
import { TypingIndicator } from '@/components/atoms/TypingIndicator';
import { PlusCircle, Send, Sparkles } from 'lucide-react';
import { chaitanyaApi } from '@/store/chaitanya';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function Home() {
  const { agent } = useAppContext();
  const { status } = useSelector((state: RootState) => state.socket);
  const [_input, _setInput] = useState('');
  const input = _input;
  const setInput = (value: string) => {
    _setInput(value);
    // Auto-connect if disconnected when user starts typing
    if (status === 'disconnected' && value.trim().length > 0) {
      console.log('🔌 Auto-connecting due to user input...');
      store.dispatch(connectSocket());
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { emit } = useSocket();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(
    typeof window !== 'undefined' ? window.localStorage.getItem('conversationId') || null : null,
  );
  const { data: conversation } = chaitanyaApi.useGetEmbedConversationByIdQuery(
    { id: currentConversationId || '', 'x-user-id': env.userId },
    { skip: !currentConversationId },
  );

  const handleSend = () => {
    if (!input.trim() || !agent) return;

    // 1️⃣ Create user message locally (for instant UI feedback)
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // 2️⃣ Prepare payload for backend
    const payload = {
      userId: env.userId, // your logged-in user (replace with real auth user)
      agentId: agent.id,
      message: input,
      conversationId: currentConversationId ?? undefined,
      metadata: { timestamp: new Date().toISOString() },
    };

    // 3️⃣ Emit the socket event
    emit('stream', payload);
  };

  const newChat = () => {
    // Reset messages and conversation ID
    setMessages([]);
    setCurrentConversationId(null);
  };

  useSocket('stream.start', () => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      },
    ]);
  });

  useSocket('stream.chunk', (data) => {
    setMessages((prev) => {
      const updated = [...prev];
      const lastMsg = updated[updated.length - 1];
      if (lastMsg?.role === 'assistant') {
        lastMsg.content += data.message;
      }
      return [...updated];
    });
  });

  useSocket('stream.end', () => {
    setIsLoading(false);
  });

  useSocket('stream.updated', (data) => {
    if (data.conversationId) setCurrentConversationId(data.conversationId);
  });

  useSocket('stream.error', (err) => {
    console.error('Stream error:', err);
    setIsLoading(false);
  });

  useEffect(() => {
    window.localStorage.setItem('conversationId', currentConversationId || '');
  }, [currentConversationId]);

  useEffect(() => {
    if (conversation && conversation.messages)
      setMessages(
        conversation.messages.map((message) => ({
          id: message.id,
          content: message.content,
          role: message.role === 'USER' ? 'user' : 'assistant',
          timestamp: new Date(message.createdAt),
        })),
      );
  }, [conversation]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              {agent?.logo?.publicUrl ? (
                <img
                  src={agent.logo.publicUrl}
                  alt={agent.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Sparkles className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{agent?.name || 'AI Assistant'}</h1>
              <p className="text-xs text-gray-400">
                {status === 'connected' ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    Offline
                  </span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={newChat}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            New Chat
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl mb-6">
                {agent?.logo?.publicUrl ? (
                  <img
                    src={agent.logo.publicUrl}
                    alt={agent.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Sparkles className="w-10 h-10 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Welcome to {agent?.name || 'AI Assistant'}
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                Start a conversation by typing a message below. I&apos;m here to help you with
                anything you need!
              </p>
            </div>
          ) : (
            <div>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  agentIcon={agent?.logo?.publicUrl}
                  agentName={agent?.name}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3 items-start"
          >
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message... (Shift + Enter for new line)"
                className="w-full px-4 py-3 pr-4 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 resize-none placeholder-gray-500 shadow-inner"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '200px',
                  height: 'auto',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                }}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isLoading || status !== 'connected'}
              className="flex-shrink-0 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </form>

          {status !== 'connected' && (
            <p className="text-xs text-amber-500 mt-2 text-center flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Connecting to server...
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
