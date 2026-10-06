import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Modal } from '../common/Modal';
import { PlatformBadge, StatusBadge, EnvironmentBadge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Globe2, 
  Copy, 
  MessageCircle 
} from 'lucide-react';

export function ChatbotDetailModal() {
  const { inspectingBot, setInspectingBot, setTestingBot, addToast } = useChatbots();

  if (!inspectingBot) return null;

  const copyWebhook = () => {
    const url = `https://api.chatbot-forge.io/v1/gateways/${inspectingBot.platform.toLowerCase()}/${inspectingBot.id}`;
    navigator.clipboard?.writeText(url);
    addToast("Copied webhook endpoint to clipboard!", "success");
  };

  return (
    <Modal
      isOpen={Boolean(inspectingBot)}
      onClose={() => setInspectingBot(null)}
      title={inspectingBot.name}
      subtitle={`Configuration & Metadata Specifications`}
      maxWidth="580px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => setInspectingBot(null)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const bot = inspectingBot;
              setInspectingBot(null);
              setTestingBot(bot);
            }}
            icon={MessageSquare}
          >
            Launch Test Sandbox
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Badges strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlatformBadge platform={inspectingBot.platform} />
            <EnvironmentBadge environment={inspectingBot.environment} />
          </div>
          <StatusBadge status={inspectingBot.status} />
        </div>

        {/* Description */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Instance Description
          </span>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: 1.5 }}>
            {inspectingBot.description}
          </p>
        </div>

        {/* Intents Matrix */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.45rem' }}>
            <Sparkles size={14} color="var(--accent-secondary)" />
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Configured Intents ({inspectingBot.intents.length})
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {inspectingBot.intents.map((intent, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}
              >
                {intent}
              </span>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Default Initial Greeting
          </span>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>
            "{inspectingBot.welcomeMessage}"
          </div>
        </div>

        {/* Technical Specs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            fontSize: '0.8rem'
          }}
        >
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>AI Model Core</span>
            <strong style={{ color: 'var(--text-primary)' }}>{inspectingBot.model}</strong>
          </div>

          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Success Accuracy</span>
            <strong style={{ color: 'var(--status-active)' }}>{inspectingBot.successRate || '96.5%'}</strong>
          </div>

          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Created Timestamp</span>
            <span style={{ color: 'var(--text-primary)' }}>{new Date(inspectingBot.createdAt).toLocaleDateString()}</span>
          </div>

          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Total Sessions</span>
            <span style={{ color: 'var(--text-primary)' }}>{(inspectingBot.totalConversations || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Webhook Endpoint */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.72rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
            <code>https://api.chatbot-forge.io/v1/gateways/{inspectingBot.platform.toLowerCase()}/{inspectingBot.id}</code>
          </div>
          <button
            onClick={copyWebhook}
            title="Copy webhook"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}
          >
            <Copy size={13} />
            Copy
          </button>
        </div>
      </div>
    </Modal>
  );
}
