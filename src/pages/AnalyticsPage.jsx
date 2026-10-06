import React from 'react';
import { useChatbots } from '../context/ChatbotContext';
import { PlatformBadge } from '../components/common/Badge';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Cpu 
} from 'lucide-react';

export function AnalyticsPage() {
  const { chatbots, stats } = useChatbots();

  const platformBreakdown = [
    { name: 'WhatsApp', percentage: 38, count: '14,820 msg', color: 'var(--platform-whatsapp)' },
    { name: 'Web Chat', percentage: 29, count: '14,940 msg', color: 'var(--platform-web)' },
    { name: 'Discord', percentage: 17, count: '5,120 msg', color: 'var(--platform-discord)' },
    { name: 'Slack', percentage: 14, count: '3,950 msg', color: 'var(--platform-slack)' },
    { name: 'MS Teams', percentage: 2, count: '640 msg', color: 'var(--platform-teams)' },
  ];

  const topIntents = [
    { intent: 'Order Tracking & Delivery', frequency: '34%', category: 'E-Commerce' },
    { intent: 'Pod Health & Deployment Trigger', frequency: '22%', category: 'DevOps' },
    { intent: 'Product Tour & Onboarding', frequency: '18%', category: 'Product' },
    { intent: 'Refund Status & Claims', frequency: '14%', category: 'Support' },
    { intent: 'PTO Request & HR Policy', frequency: '12%', category: 'HR' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Telemetry & Extensibility (SRS Sec 17.2)
        </span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
          Conversation Analytics & Gateway Health
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Real-time insights across multi-channel AI endpoints, intent resolution rates, and model latency metrics.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span>Avg Gateway Latency</span>
            <Zap size={16} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            142 ms
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-active)' }}>-18ms from last week</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span>Intent Accuracy Rate</span>
            <CheckCircle2 size={16} color="var(--status-active)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            96.4%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidence threshold &gt; 0.85</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span>Active Webhook Endpoints</span>
            <Activity size={16} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            {stats.activeCount} / {stats.total}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--status-active)' }}>100% operational uptime</span>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span>Supported Model Architectures</span>
            <Cpu size={16} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '700', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            3 Engines
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GPT-4o, Claude 3.5, Gemini 1.5</span>
        </div>
      </div>

      {/* Two Column Grid: Platform Share & Top Intents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Platform Share */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            Traffic Distribution by Gateway Platform
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Volume share of inbound user inquiries across messaging channels.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {platformBreakdown.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{item.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{item.count} ({item.percentage}%)</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Intents */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
            Top Requested Intent Categories
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Frequently triggered intent mappings matched during sessions.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {topIntents.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {item.intent}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Domain: {item.category}
                  </div>
                </div>
                <span
                  style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    color: 'var(--accent-primary)',
                    fontSize: '0.78rem',
                    fontWeight: '600'
                  }}
                >
                  {item.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
