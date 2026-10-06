import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { PlatformBadge, StatusBadge, EnvironmentBadge } from '../common/Badge';
import { 
  Bot, 
  Trash2, 
  MessageSquare, 
  Info, 
  Calendar, 
  Sparkles, 
  Activity,
  Cpu
} from 'lucide-react';

export function ChatbotCard({ bot }) {
  const { 
    setDeletingBot, 
    setTestingBot, 
    setInspectingBot, 
    toggleBotStatus, 
    currentRole 
  } = useChatbots();

  const formattedDate = new Date(bot.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const canDelete = currentRole === 'Admin';
  const canToggle = currentRole !== 'Support Agent';

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        position: 'relative',
        transition: 'all var(--transition-normal)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      {/* Top Row: Platform Badge + Status + Env */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <PlatformBadge platform={bot.platform} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <EnvironmentBadge environment={bot.environment} />
            <button
              onClick={() => canToggle && toggleBotStatus(bot.id)}
              disabled={!canToggle}
              title={canToggle ? "Click to toggle active/inactive status" : "Read-only"}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: canToggle ? 'pointer' : 'default'
              }}
            >
              <StatusBadge status={bot.status} />
            </button>
          </div>
        </div>

        {/* Bot Name & Description */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              flexShrink: 0
            }}
          >
            <Bot size={20} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: 1.25 }}>
              {bot.name}
            </h3>
            <p 
              style={{ 
                fontSize: '0.8rem', 
                color: 'var(--text-secondary)', 
                marginTop: '0.35rem',
                lineHeight: 1.45,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {bot.description}
            </p>
          </div>
        </div>

        {/* Associated Intents Summary View (SRS Sec 4.2) */}
        <div style={{ margin: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.45rem' }}>
            <Sparkles size={13} color="var(--accent-secondary)" />
            <span style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Associated Intents ({bot.intents.length})
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {bot.intents.slice(0, 3).map((intent, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: '500'
                }}
              >
                {intent}
              </span>
            ))}
            {bot.intents.length > 3 && (
              <button
                onClick={() => setInspectingBot(bot)}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  color: 'var(--accent-primary)',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                +{bot.intents.length - 3} more
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div 
        style={{ 
          paddingTop: '0.9rem', 
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.5rem'
        }}
      >
        {/* Model info & timestamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Cpu size={12} />
            {bot.model}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={12} />
            {formattedDate}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {/* Inspect Details */}
          <button
            onClick={() => setInspectingBot(bot)}
            title="Inspect full chatbot details"
            aria-label={`Inspect ${bot.name}`}
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'; }}
          >
            <Info size={14} />
          </button>

          {/* Test in Sandbox */}
          <button
            onClick={() => setTestingBot(bot)}
            title="Test chatbot interactively"
            aria-label={`Test ${bot.name} in interactive sandbox`}
            style={{
              padding: '0.4rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--accent-primary)',
              fontSize: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-primary)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
          >
            <MessageSquare size={13} />
            Test
          </button>

          {/* Delete Button (SRS Sec 8 - Restricted to Admin) */}
          {canDelete && (
            <button
              onClick={() => setDeletingBot(bot)}
              title="Delete chatbot instance"
              aria-label={`Delete ${bot.name}`}
              style={{
                padding: '0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                backgroundColor: 'rgba(239, 68, 68, 0.06)',
                color: 'var(--status-danger)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.06)'; }}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
