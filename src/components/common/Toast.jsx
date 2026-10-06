import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useChatbots();

  if (!toasts || toasts.length === 0) return null;

  const getToastConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle2,
          color: 'var(--status-active)',
          border: 'rgba(16, 185, 129, 0.35)',
          bg: 'rgba(15, 23, 42, 0.95)'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'var(--status-danger)',
          border: 'rgba(239, 68, 68, 0.35)',
          bg: 'rgba(15, 23, 42, 0.95)'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'var(--status-draft)',
          border: 'rgba(245, 158, 11, 0.35)',
          bg: 'rgba(15, 23, 42, 0.95)'
        };
      default:
        return {
          icon: Info,
          color: 'var(--accent-primary)',
          border: 'rgba(99, 102, 241, 0.35)',
          bg: 'rgba(15, 23, 42, 0.95)'
        };
    }
  };

  return (
    <div
      role="region"
      aria-label="Notifications"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        maxWidth: '400px',
        width: 'calc(100% - 3rem)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => {
        const config = getToastConfig(toast.type);
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            role="alert"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: config.bg,
              border: `1px solid ${config.border}`,
              boxShadow: 'var(--shadow-lg), 0 0 20px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
              <Icon size={18} color={config.color} style={{ flexShrink: 0 }} />
              <span style={{ lineHeight: 1.4 }}>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
