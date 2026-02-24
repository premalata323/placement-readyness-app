import React from 'react';
import './ContextHeader.css';

export interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  headline,
  subtext,
}) => {
  return (
    <section className="kn-context-header">
      <div className="kn-context-header__inner">
        <h1 className="kn-context-header__headline">{headline}</h1>
        <p className="kn-context-header__subtext">{subtext}</p>
      </div>
    </section>
  );
};
