import React from 'react';
import './States.css';

export interface EmptyStateProps {
  message: string;
  action?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  action,
  onAction,
}) => {
  return (
    <div className="kn-empty-state">
      <p className="kn-empty-state__message">{message}</p>
      {action && onAction && (
        <button className="kn-empty-state__action" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title: string;
  description: string;
  suggestion: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  suggestion,
  onRetry,
}) => {
  return (
    <div className="kn-error-state">
      <h4 className="kn-error-state__title">{title}</h4>
      <p className="kn-error-state__description">{description}</p>
      <p className="kn-error-state__suggestion">{suggestion}</p>
      {onRetry && (
        <button className="kn-error-state__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};
