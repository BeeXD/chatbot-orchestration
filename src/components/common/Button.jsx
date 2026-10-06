import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--accent-gradient)',
          color: 'var(--text-on-accent)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: 'var(--accent-gradient-glow), var(--shadow-sm)'
        };
      case 'secondary':
        return {
          background: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)'
        };
      case 'danger':
        return {
          background: 'rgba(239, 68, 68, 0.15)',
          color: 'var(--status-danger)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          boxShadow: '0 0 12px rgba(239, 68, 68, 0.15)'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.4rem' };
      case 'lg':
        return { padding: '0.75rem 1.5rem', fontSize: '1rem', gap: '0.65rem' };
      default:
        return { padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.5rem' };
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        borderRadius: 'var(--radius-md)',
        cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--transition-fast)',
        userSelect: 'none',
        ...getSizeStyles(),
        ...getVariantStyles(),
        ...style
      }}
      className={`custom-btn ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="spinner" />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </button>
  );
}
