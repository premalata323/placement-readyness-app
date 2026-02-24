import React, { useState } from 'react';
import './PromptBox.css';

export interface PromptBoxProps {
  content: string;
  className?: string;
}

export const PromptBox: React.FC<PromptBoxProps> = ({
  content,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`kn-prompt-box ${className}`}>
      <pre className="kn-prompt-box__content">{content}</pre>
      <button className="kn-prompt-box__copy" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};
