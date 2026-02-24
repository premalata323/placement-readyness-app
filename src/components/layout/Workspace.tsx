import React from 'react';
import './Workspace.css';

export interface WorkspaceProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  primary,
  secondary,
}) => {
  return (
    <div className="kn-workspace">
      <div className="kn-workspace__inner">
        <main className="kn-workspace__primary">
          {primary}
        </main>
        <aside className="kn-workspace__secondary">
          {secondary}
        </aside>
      </div>
    </div>
  );
};
