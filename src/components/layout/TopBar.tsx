import React from 'react';
import './TopBar.css';
import { Badge } from '../base/Badge';

export interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: 'not-started' | 'in-progress' | 'shipped';
}

const statusMap: Record<TopBarProps['status'], { label: string; variant: 'default' | 'warning' | 'success' }> = {
  'not-started': { label: 'Not Started', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'warning' },
  'shipped': { label: 'Shipped', variant: 'success' },
};

export const TopBar: React.FC<TopBarProps> = ({
  projectName,
  currentStep,
  totalSteps,
  status,
}) => {
  const statusInfo = statusMap[status];

  return (
    <header className="kn-topbar">
      <div className="kn-topbar__inner">
        <div className="kn-topbar__left">
          <span className="kn-topbar__project">{projectName}</span>
        </div>
        <div className="kn-topbar__center">
          <span className="kn-topbar__progress">
            Step {currentStep} / {totalSteps}
          </span>
        </div>
        <div className="kn-topbar__right">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        </div>
      </div>
    </header>
  );
};
