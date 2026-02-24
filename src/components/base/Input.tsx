import React from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'kn-input__field',
    error ? 'kn-input__field--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="kn-input">
      {label && (
        <label htmlFor={inputId} className="kn-input__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClasses}
        {...props}
      />
      {error && (
        <span className="kn-input__error">{error}</span>
      )}
      {hint && !error && (
        <span className="kn-input__hint">{hint}</span>
      )}
    </div>
  );
};

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'kn-input__field',
    'kn-input__textarea',
    error ? 'kn-input__field--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="kn-input">
      {label && (
        <label htmlFor={inputId} className="kn-input__label">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={inputClasses}
        {...props}
      />
      {error && (
        <span className="kn-input__error">{error}</span>
      )}
      {hint && !error && (
        <span className="kn-input__hint">{hint}</span>
      )}
    </div>
  );
};
