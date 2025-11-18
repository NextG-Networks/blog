'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeBlockProps {
  value: {
    code: string;
    language?: string;
    filename?: string;
  };
}

export default function CodeBlock({ value }: CodeBlockProps) {
  let theme: 'light' | 'dark' = 'light';
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
  } catch {
    // Fallback to light theme if context is not available
    theme = 'light';
  }
  
  // Sanity code type structure: { code: string, language?: string, filename?: string }
  const code = value.code || '';
  const language = value.language || 'text';
  const filename = value.filename;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      {filename && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
            {filename}
          </span>
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
          }}
          showLineNumbers={code.split('\n').length > 5}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

