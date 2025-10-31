'use client';

import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

// Initialize mermaid once
let mermaidInitialized = false;

if (typeof window !== 'undefined' && !mermaidInitialized) {
  mermaid.initialize({
    startOnLoad: false, // We'll manually trigger rendering
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'inherit',
    darkMode: true,
    logLevel: 'error',
    suppressErrorRendering: false,
    deterministicIds: true,
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis',
    },
    themeVariables: {
      darkMode: true,
    },
  });
  mermaidInitialized = true;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const inline = !className;

            // Handle code blocks
            if (!inline && match) {
              return (
                <div className="my-4 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                    {language}
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      padding: '1rem',
                      fontSize: '0.875rem',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }

            // Handle inline code
            return (
              <code
                className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <div className="overflow-x-auto">{children}</div>;
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mt-6 mb-4 text-white">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold mt-5 mb-3 text-white">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-bold mt-4 mb-2 text-white">{children}</h3>;
          },
          p({ children }) {
            return <p className="mb-4 text-gray-200 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-inside mb-4 space-y-2 text-gray-200">{children}</ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-200">{children}</ol>
            );
          },
          li({ children }) {
            return <li className="text-gray-200">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-300">
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-700">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-800">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="bg-gray-900">{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border-b border-gray-700">{children}</tr>;
          },
          th({ children }) {
            return <th className="px-4 py-2 text-left text-gray-200 font-semibold">{children}</th>;
          },
          td({ children }) {
            return <td className="px-4 py-2 text-gray-300">{children}</td>;
          },
          hr() {
            return <hr className="my-6 border-gray-700" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
