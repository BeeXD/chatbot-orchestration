import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PlatformBadge } from '../common/Badge';
import { AlertTriangle, Trash2 } from 'lucide-react';

export function DeleteConfirmModal() {
  const { 
    deletingBot, 
    setDeletingBot, 
    deleteChatbot, 
    actionLoading 
  } = useChatbots();

  if (!deletingBot) return null;

  const handleConfirm = async () => {
    await deleteChatbot(deletingBot.id);
  };

  return (
    <Modal
      isOpen={Boolean(deletingBot)}
      onClose={() => !actionLoading && setDeletingBot(null)}
      title="Delete Chatbot Instance"
      subtitle="Critical action confirmation safeguard"
      maxWidth="480px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => setDeletingBot(null)}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            loading={actionLoading}
            icon={Trash2}
          >
            Permanently Delete
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <AlertTriangle size={24} color="var(--status-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            You are about to permanently delete this chatbot configuration. This will unbind it from active webhook listeners and terminate its conversational routing.
          </div>
        </div>

        {/* Selected Bot Details Summary */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Chatbot Name:</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {deletingBot.name}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target Platform:</span>
            <PlatformBadge platform={deletingBot.platform} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Associated Intents:</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {deletingBot.intents ? deletingBot.intents.length : 0} configured
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
