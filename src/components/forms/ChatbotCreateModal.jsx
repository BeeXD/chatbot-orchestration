import React, { useState } from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AVAILABLE_PLATFORMS } from '../../services/mockData';
import { PlatformBadge, EnvironmentBadge } from '../common/Badge';
import { 
  Bot, 
  Sparkles, 
  Plus, 
  X, 
  Globe, 
  MessageCircle, 
  Hash, 
  MessageSquare, 
  Users, 
  AlertCircle 
} from 'lucide-react';

export function ChatbotCreateModal() {
  const { 
    isCreateModalOpen, 
    setIsCreateModalOpen, 
    createChatbot, 
    actionLoading 
  } = useChatbots();

  const [formData, setFormData] = useState({
    name: '',
    platform: 'Web',
    description: '',
    environment: 'Development',
    model: 'GPT-4o',
    welcomeMessage: '',
    status: 'active'
  });

  const [intents, setIntents] = useState(['General Inquiries']);
  const [intentInput, setIntentInput] = useState('');
  const [errors, setErrors] = useState({});

  if (!isCreateModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Chatbot name is required.";
    } else if (formData.name.trim().length < 3) {
      errs.name = "Chatbot name must be at least 3 characters.";
    }

    if (!formData.platform) {
      errs.platform = "Please select a target deployment platform.";
    }

    if (intents.length === 0) {
      errs.intents = "You must assign at least one intent to this chatbot.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddIntent = (e) => {
    e?.preventDefault();
    const trimmed = intentInput.trim();
    if (!trimmed) return;

    if (intents.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setErrors(prev => ({ ...prev, intents: `"${trimmed}" is already added.` }));
      return;
    }

    setIntents(prev => [...prev, trimmed]);
    setIntentInput('');
    setErrors(prev => ({ ...prev, intents: null }));
  };

  const handleRemoveIntent = (intentToRemove) => {
    const updated = intents.filter(i => i !== intentToRemove);
    setIntents(updated);
    if (updated.length === 0) {
      setErrors(prev => ({ ...prev, intents: "You must assign at least one intent to this chatbot." }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await createChatbot({
      ...formData,
      intents
    });

    if (success) {
      // Reset form
      setFormData({
        name: '',
        platform: 'Web',
        description: '',
        environment: 'Development',
        model: 'GPT-4o',
        welcomeMessage: '',
        status: 'active'
      });
      setIntents(['General Inquiries']);
      setErrors({});
    }
  };

  const platformOptions = AVAILABLE_PLATFORMS.filter(p => p.id !== 'all');

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => !actionLoading && setIsCreateModalOpen(false)}
      title="Create New AI Chatbot"
      subtitle="Register an instance with target gateway & intent mappings"
      maxWidth="640px"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => setIsCreateModalOpen(false)}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={actionLoading}
            icon={Plus}
          >
            Register & Deploy
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Name Input (SRS Sec 5.2 - Mandatory) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>
              Chatbot Name <strong style={{ color: 'var(--status-danger)' }}>*</strong>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Mandatory</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="e.g. Sales Concierge, IT Helpdesk"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-tertiary)',
              border: `1px solid ${errors.name ? 'var(--status-danger)' : 'var(--border-medium)'}`,
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          {errors.name && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--status-danger)', fontSize: '0.75rem', marginTop: '0.3rem' }}>
              <AlertCircle size={13} />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Platform Selection Cards (Mandatory) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>
              Target Platform <strong style={{ color: 'var(--status-danger)' }}>*</strong>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Required</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem' }}>
            {platformOptions.map(plat => {
              const isSelected = formData.platform === plat.id;
              return (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => setFormData({ ...formData, platform: plat.id })}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? '600' : '500',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <PlatformBadge platform={plat.id} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Description Input (Optional) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>Description</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Optional</span>
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the primary role and conversational domain of this chatbot..."
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        {/* Dynamic Intent Tag Registration (SRS Sec 4.2 & 5.2 - Mandatory) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: '600' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} color="var(--accent-secondary)" />
              Associated Intents <strong style={{ color: 'var(--status-danger)' }}>*</strong>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>At least 1 required</span>
          </label>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              padding: '0.55rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: `1px solid ${errors.intents ? 'var(--status-danger)' : 'var(--border-medium)'}`,
              borderRadius: 'var(--radius-md)',
              minHeight: '44px'
            }}
          >
            {intents.map((intent, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  color: 'var(--text-primary)',
                  fontSize: '0.78rem',
                  fontWeight: '500'
                }}
              >
                {intent}
                <button
                  type="button"
                  onClick={() => handleRemoveIntent(intent)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--status-danger)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            <div style={{ display: 'flex', flex: 1, minWidth: '160px', gap: '0.3rem' }}>
              <input
                type="text"
                value={intentInput}
                onChange={(e) => setIntentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddIntent();
                  }
                }}
                placeholder="Type intent & press Enter..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              {intentInput.trim() && (
                <button
                  type="button"
                  onClick={handleAddIntent}
                  style={{
                    background: 'var(--accent-primary)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              )}
            </div>
          </div>

          {errors.intents && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--status-danger)', fontSize: '0.75rem', marginTop: '0.3rem' }}>
              <AlertCircle size={13} />
              <span>{errors.intents}</span>
            </div>
          )}
        </div>

        {/* Environment & Model Pickers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: '600' }}>
              Environment
            </label>
            <select
              value={formData.environment}
              onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="Development" style={{ background: '#0f172a' }}>Development</option>
              <option value="Staging" style={{ background: '#0f172a' }}>Staging</option>
              <option value="Production" style={{ background: '#0f172a' }}>Production</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: '600' }}>
              AI Model Engine
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="GPT-4o" style={{ background: '#0f172a' }}>GPT-4o (OpenAI)</option>
              <option value="Claude 3.5 Sonnet" style={{ background: '#0f172a' }}>Claude 3.5 Sonnet (Anthropic)</option>
              <option value="Gemini 1.5 Pro" style={{ background: '#0f172a' }}>Gemini 1.5 Pro (Google)</option>
            </select>
          </div>
        </div>

        {/* Optional Welcome Message */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>Welcome Greeting Message</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Optional</span>
          </label>
          <input
            type="text"
            value={formData.welcomeMessage}
            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
            placeholder="e.g. Hello! How can I assist you today?"
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      </form>
    </Modal>
  );
}
