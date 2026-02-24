import React from 'react';
import './ProofFooter.css';
import { Checkbox } from '../base/Checkbox';

export interface ProofItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ProofFooterProps {
  items: ProofItem[];
  onToggle: (id: string, checked: boolean) => void;
}

export const ProofFooter: React.FC<ProofFooterProps> = ({
  items,
  onToggle,
}) => {
  return (
    <footer className="kn-proof-footer">
      <div className="kn-proof-footer__inner">
        <span className="kn-proof-footer__title">Proof Checklist</span>
        <div className="kn-proof-footer__items">
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={(checked) => onToggle(item.id, checked)}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
