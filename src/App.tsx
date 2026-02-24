import { useState } from 'react';
import './App.css';

/* Base Components */
import { Button } from './components/base/Button';
import { Input, TextArea } from './components/base/Input';
import { Card } from './components/base/Card';
import { Badge } from './components/base/Badge';
import { Checkbox } from './components/base/Checkbox';
import { PromptBox } from './components/base/PromptBox';
import { EmptyState, ErrorState } from './components/base/States';

/* Layout Components */
import { TopBar } from './components/layout/TopBar';
import { ContextHeader } from './components/layout/ContextHeader';
import { Workspace } from './components/layout/Workspace';
import { ProofFooter } from './components/layout/ProofFooter';

function App() {
  const [proofItems, setProofItems] = useState([
    { id: 'ui', label: 'UI Built', checked: false },
    { id: 'logic', label: 'Logic Working', checked: false },
    { id: 'test', label: 'Test Passed', checked: false },
    { id: 'deployed', label: 'Deployed', checked: false },
  ]);

  const handleProofToggle = (id: string, checked: boolean) => {
    setProofItems(items =>
      items.map(item => item.id === id ? { ...item, checked } : item)
    );
  };

  return (
    <div className="app-shell">
      {/* TOP BAR */}
      <TopBar
        projectName="KodNest Premium"
        currentStep={1}
        totalSteps={6}
        status="in-progress"
      />

      {/* CONTEXT HEADER */}
      <ContextHeader
        headline="Design System Reference"
        subtext="Every component, token, and pattern in the KodNest Premium Build System."
      />

      {/* PRIMARY WORKSPACE + SECONDARY PANEL */}
      <Workspace
        primary={<PrimaryContent />}
        secondary={<SecondaryContent />}
      />

      {/* PROOF FOOTER */}
      <ProofFooter items={proofItems} onToggle={handleProofToggle} />
    </div>
  );
}

/* ============================
 * PRIMARY CONTENT
 * ============================ */
function PrimaryContent() {
  return (
    <div className="demo-sections">
      {/* COLOR SYSTEM */}
      <section className="demo-section">
        <h2>Color System</h2>
        <p>Maximum four colors. Calm, intentional, coherent.</p>
        <div className="demo-color-grid">
          <ColorSwatch color="#F7F6F3" label="Background" token="--color-background" />
          <ColorSwatch color="#111111" label="Primary Text" token="--color-text-primary" dark />
          <ColorSwatch color="#8B0000" label="Accent" token="--color-accent" dark />
          <ColorSwatch color="#FFFFFF" label="Surface" token="--color-surface" border />
        </div>
        <div className="demo-color-grid" style={{ marginTop: 'var(--space-sm)' }}>
          <ColorSwatch color="#4A6741" label="Success" token="--color-success" dark />
          <ColorSwatch color="#8B7355" label="Warning" token="--color-warning" dark />
          <ColorSwatch color="#E5E4E1" label="Border" token="--color-border" />
          <ColorSwatch color="#666666" label="Secondary Text" token="--color-text-secondary" dark />
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="demo-section">
        <h2>Typography</h2>
        <p>Serif headings with generous spacing. Clean sans-serif body.</p>
        <Card>
          <div className="demo-type-stack">
            <div className="demo-type-row">
              <span className="demo-type-label">H1 / 48px</span>
              <h1 style={{ margin: 0 }}>Build with intent</h1>
            </div>
            <div className="demo-type-row">
              <span className="demo-type-label">H2 / 40px</span>
              <h2 style={{ margin: 0 }}>Build with intent</h2>
            </div>
            <div className="demo-type-row">
              <span className="demo-type-label">H3 / 32px</span>
              <h3 style={{ margin: 0 }}>Build with intent</h3>
            </div>
            <div className="demo-type-row">
              <span className="demo-type-label">H4 / 24px</span>
              <h4 style={{ margin: 0 }}>Build with intent</h4>
            </div>
            <div className="demo-type-row">
              <span className="demo-type-label">Body / 16px</span>
              <p style={{ margin: 0 }}>Design systems should feel calm and predictable. Every element exists for a reason.</p>
            </div>
            <div className="demo-type-row">
              <span className="demo-type-label">Small / 14px</span>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Supporting text for secondary information</span>
            </div>
            <div className="demo-type-row">
              <span className="demo-type-label">Mono / 14px</span>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>const system = "coherent";</code>
            </div>
          </div>
        </Card>
      </section>

      {/* SPACING */}
      <section className="demo-section">
        <h2>Spacing Scale</h2>
        <p>Consistent 8px-based scale. No random values.</p>
        <Card>
          <div className="demo-spacing-stack">
            {[
              { label: 'XS', value: '8px', token: '--space-xs' },
              { label: 'SM', value: '16px', token: '--space-sm' },
              { label: 'MD', value: '24px', token: '--space-md' },
              { label: 'LG', value: '40px', token: '--space-lg' },
              { label: 'XL', value: '64px', token: '--space-xl' },
            ].map(s => (
              <div key={s.label} className="demo-spacing-row">
                <span className="demo-spacing-label">{s.label}</span>
                <div className="demo-spacing-bar" style={{ width: s.value }} />
                <span className="demo-spacing-value">{s.value}</span>
                <code className="demo-spacing-token">{s.token}</code>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* BUTTONS */}
      <section className="demo-section">
        <h2>Buttons</h2>
        <p>Primary: solid deep red. Secondary: outlined. Consistent radius and transitions.</p>
        <Card>
          <div className="demo-row">
            <div className="demo-group">
              <span className="demo-group-label">Primary</span>
              <div className="demo-inline">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
            <div className="demo-group">
              <span className="demo-group-label">Secondary</span>
              <div className="demo-inline">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
            </div>
            <div className="demo-group">
              <span className="demo-group-label">Ghost</span>
              <div className="demo-inline">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost" size="md">Medium</Button>
                <Button variant="ghost" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* INPUTS */}
      <section className="demo-section">
        <h2>Inputs</h2>
        <p>Clean borders, no heavy shadows, clear focus states.</p>
        <Card>
          <div className="demo-input-grid">
            <Input label="Project name" placeholder="Enter project name" />
            <Input label="Repository URL" placeholder="https://github.com/..." hint="Paste the full repository URL" />
            <Input label="Email" placeholder="name@example.com" error="This email is already registered. Try signing in instead." />
            <Input label="Disabled field" placeholder="Cannot edit" disabled />
            <div style={{ gridColumn: '1 / -1' }}>
              <TextArea label="Description" placeholder="Describe your project in a few sentences..." rows={4} />
            </div>
          </div>
        </Card>
      </section>

      {/* BADGES */}
      <section className="demo-section">
        <h2>Badges</h2>
        <Card>
          <div className="demo-inline">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>
      </section>

      {/* CARDS */}
      <section className="demo-section">
        <h2>Cards</h2>
        <p>Subtle border, no drop shadows, balanced padding.</p>
        <div className="demo-card-grid">
          <Card padding="sm">
            <h4 style={{ margin: '0 0 8px' }}>Small padding</h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>16px internal padding. Compact content areas.</p>
          </Card>
          <Card padding="md">
            <h4 style={{ margin: '0 0 8px' }}>Medium padding</h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>24px internal padding. Standard content areas.</p>
          </Card>
          <Card padding="lg">
            <h4 style={{ margin: '0 0 8px' }}>Large padding</h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '14px' }}>40px internal padding. Prominent content areas.</p>
          </Card>
        </div>
      </section>

      {/* CHECKBOXES */}
      <section className="demo-section">
        <h2>Checkboxes</h2>
        <Card>
          <div className="demo-checkbox-stack">
            <Checkbox label="Unchecked state" />
            <Checkbox label="Checked state" checked />
            <Checkbox label="Disabled state" disabled />
          </div>
        </Card>
      </section>

      {/* ERROR & EMPTY STATES */}
      <section className="demo-section">
        <h2>Error & Empty States</h2>
        <p>Errors explain what went wrong and how to fix it. Empty states provide the next action.</p>
        <div className="demo-card-grid">
          <Card padding="sm">
            <ErrorState
              title="Build failed"
              description="The deployment could not complete because of a missing environment variable."
              suggestion="Check your .env file for VITE_API_URL and redeploy."
              onRetry={() => {}}
            />
          </Card>
          <Card padding="sm">
            <EmptyState
              message="No projects yet. Create your first project to get started."
              action="Create project"
              onAction={() => {}}
            />
          </Card>
        </div>
      </section>
    </div>
  );
}

/* ============================
 * SECONDARY CONTENT
 * ============================ */
function SecondaryContent() {
  return (
    <div className="demo-secondary">
      <Card>
        <h4 style={{ margin: '0 0 8px' }}>Step Guide</h4>
        <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Review the design system components. Each element follows the same visual language.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.02em', display: 'block', marginBottom: '8px' }}>
            Prompt
          </span>
          <PromptBox content={`Build a settings page using:\n- Off-white background (#F7F6F3)\n- Deep red accent (#8B0000)\n- Serif headings, sans-serif body\n- 8px spacing scale\n- Subtle borders, no shadows`} />
        </div>

        <div className="demo-secondary-actions">
          <Button size="sm">Copy</Button>
          <Button variant="secondary" size="sm">Build in Lovable</Button>
          <Button variant="ghost" size="sm">It Worked</Button>
          <Button variant="ghost" size="sm">Error</Button>
          <Button variant="ghost" size="sm">Add Screenshot</Button>
        </div>
      </Card>
    </div>
  );
}

/* ============================
 * COLOR SWATCH HELPER
 * ============================ */
function ColorSwatch({ color, label, token, dark, border }: { color: string; label: string; token: string; dark?: boolean; border?: boolean }) {
  return (
    <div className="demo-color-swatch">
      <div
        className="demo-color-swatch__preview"
        style={{
          backgroundColor: color,
          border: border ? '1px solid var(--color-border)' : 'none',
        }}
      />
      <span className="demo-color-swatch__label" style={{ color: dark ? undefined : 'var(--color-text-secondary)' }}>{label}</span>
      <code className="demo-color-swatch__token">{token}</code>
      <span className="demo-color-swatch__hex">{color}</span>
    </div>
  );
}

export default App;
