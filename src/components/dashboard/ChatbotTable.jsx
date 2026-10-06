import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { PlatformBadge, StatusBadge, EnvironmentBadge } from '../common/Badge';
import { Bot, MessageSquare, Info, Trash2 } from 'lucide-react';

export function ChatbotTable({ bots }) {
  const { 
    setDeletingBot, 
    setTestingBot, 
    setInspectingBot, 
    toggleBotStatus, 
    currentRole 
  } = useChatbots();

  const canDelete = currentRole === 'Admin';
  const canToggle = currentRole !== 'Support Agent';

  return (
    <div
      style={{
        overflowX: 'auto',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'var(--glass-blur)'
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.85rem'
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: '1px solid var(--border-subtle)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <th style={{ padding: '1rem 1.25rem' }}>Chatbot Instance</th>
            <th style={{ padding: '1rem 1.25rem' }}>Platform</th>
            <th style={{ padding: '1rem 1.25rem' }}>Status</th>
            <th style={{ padding: '1rem 1.25rem' }}>Intents Summary</th>
            <th style={{ padding: '1rem 1.25rem' }}>Created</th>
            <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bots.map((bot, index) => {
            const formattedDate = new Date(bot.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <tr
                key={bot.id}
                style={{
                  borderBottom: index < bots.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {/* Name & Model */}
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-primary)',
                        flexShrink: 0
                      }}
                    >
                      <Bot size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{bot.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {bot.model} • <EnvironmentBadge environment={bot.environment} />
                      </div>
                    </div>
                  </div>
                </td>

                {/* Platform */}
                <td style={{ padding: '1rem 1.25rem' }}>
                  <PlatformBadge platform={bot.platform} />
                </td>

                {/* Status */}
                <td style={{ padding: '1rem 1.25rem' }}>
                  <button
                    onClick={() => canToggle && toggleBotStatus(bot.id)}
                    disabled={!canToggle}
                    style={{ background: 'transparent', border: 'none', cursor: canToggle ? 'pointer' : 'default', padding: 0 }}
                    title={canToggle ? "Toggle active state" : "Read-only"}
                  >
                    <StatusBadge status={bot.status} />
                  </button>
                </td>

                {/* Intents */}
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', maxWidth: '280px' }}>
                    {bot.intents.slice(0, 2).map((intent, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {intent}
                      </span>
                    ))}
                    {bot.intents.length > 2 && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '600', alignSelf: 'center' }}>
                        +{bot.intents.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Created */}
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  {formattedDate}
                </td>

                {/* Actions */}
                <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => setInspectingBot(bot)}
                      title="Inspect details"
                      aria-label="Inspect details"
                      style={{
                        padding: '0.35rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      <Info size={14} />
                    </button>

                    <button
                      onClick={() => setTestingBot(bot)}
                      title="Test Chatbot"
                      aria-label="Test Chatbot"
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--accent-primary)',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <MessageSquare size={12} />
                      Test
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => setDeletingBot(bot)}
                        title="Delete chatbot"
                        aria-label="Delete chatbot"
                        style={{
                          padding: '0.35rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          backgroundColor: 'rgba(239, 68, 68, 0.06)',
                          color: 'var(--status-danger)',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
