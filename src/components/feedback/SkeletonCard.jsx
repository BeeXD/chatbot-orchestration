import React from 'react';

export function SkeletonCard() {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.4rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        opacity: 0.7
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '22px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }} />
        <div style={{ width: '60px', height: '20px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }} />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ width: '60%', height: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
          <div style={{ width: '90%', height: '12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.35rem' }}>
        <div style={{ width: '50px', height: '18px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '70px', height: '18px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '45px', height: '18px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
      </div>

      <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '14px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '60px', height: '26px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }} />
      </div>
    </div>
  );
}
