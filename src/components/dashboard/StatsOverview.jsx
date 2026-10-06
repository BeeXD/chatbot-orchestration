import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Bot, Layers, Sparkles, Activity, MessageSquare } from 'lucide-react';

export function StatsOverview() {
  const { stats } = useChatbots();

  const statCards = [
    {
      label: 'Total Chatbot Instances',
      value: stats.total,
      subtext: `${stats.activeCount} active deployments`,
      icon: Bot,
      color: 'var(--accent-primary)',
      bg: 'rgba(99, 102, 241, 0.12)'
    },
    {
      label: 'Integrated Platforms',
      value: stats.platformsCount,
      subtext: 'Slack, WhatsApp, Web, Discord, Teams',
      icon: Layers,
      color: 'var(--platform-whatsapp)',
      bg: 'rgba(16, 185, 129, 0.12)'
    },
    {
      label: 'Registered Intent Mappings',
      value: stats.totalIntents,
      subtext: 'Summary view across all bots',
      icon: Sparkles,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)'
    },
    {
      label: 'Total Recorded Interactions',
      value: stats.totalInteractions.toLocaleString(),
      subtext: 'Across all active channels',
      icon: MessageSquare,
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.12)'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}
    >
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                {stat.label}
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}
              >
                <Icon size={18} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                {stat.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
