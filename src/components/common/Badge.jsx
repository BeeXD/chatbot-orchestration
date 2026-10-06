import React from 'react';
import { 
  Globe, 
  MessageCircle, 
  Hash, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock 
} from 'lucide-react';

export function PlatformBadge({ platform }) {
  const getPlatformConfig = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'slack':
        return {
          icon: Hash,
          label: 'Slack',
          color: 'var(--platform-slack)',
          bg: 'var(--platform-slack-bg)'
        };
      case 'whatsapp':
        return {
          icon: MessageCircle,
          label: 'WhatsApp',
          color: 'var(--platform-whatsapp)',
          bg: 'var(--platform-whatsapp-bg)'
        };
      case 'web':
        return {
          icon: Globe,
          label: 'Web Chat',
          color: 'var(--platform-web)',
          bg: 'var(--platform-web-bg)'
        };
      case 'discord':
        return {
          icon: MessageSquare,
          label: 'Discord',
          color: 'var(--platform-discord)',
          bg: 'var(--platform-discord-bg)'
        };
      case 'teams':
        return {
          icon: Users,
          label: 'MS Teams',
          color: 'var(--platform-teams)',
          bg: 'var(--platform-teams-bg)'
        };
      default:
        return {
          icon: Globe,
          label: platform || 'Unknown',
          color: 'var(--text-secondary)',
          bg: 'rgba(255, 255, 255, 0.08)'
        };
    }
  };

  const config = getPlatformConfig(platform);
  const Icon = config.icon;

  return (
    <span 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.65rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: '600',
        letterSpacing: '0.02em',
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}33`,
        boxShadow: `0 0 10px ${config.color}15`,
        transition: 'transform var(--transition-fast)'
      }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {config.label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const isActive = status === 'active';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.2rem 0.55rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.72rem',
        fontWeight: '500',
        color: isActive ? 'var(--status-active)' : 'var(--text-muted)',
        backgroundColor: isActive ? 'var(--status-active-bg)' : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`
      }}
    >
      <span 
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isActive ? 'var(--status-active)' : 'var(--text-muted)',
          boxShadow: isActive ? '0 0 8px var(--status-active)' : 'none'
        }} 
      />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

export function EnvironmentBadge({ environment }) {
  const getStyle = () => {
    switch (environment?.toLowerCase()) {
      case 'production':
        return { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)' };
      case 'staging':
        return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' };
      default:
        return { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)' };
    }
  };
  const style = getStyle();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.15rem 0.45rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.7rem',
        fontWeight: '500',
        color: style.color,
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`
      }}
    >
      {environment || 'Dev'}
    </span>
  );
}
