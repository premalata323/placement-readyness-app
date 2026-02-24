import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  className = '',
  disabled = false,
}) => {
  const classNames = [
    'kn-checkbox',
    disabled ? 'kn-checkbox--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className="kn-checkbox__input"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className="kn-checkbox__box">
        {checked && (
          <svg className="kn-checkbox__icon" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="kn-checkbox__label">{label}</span>
    </label>
  );
};
