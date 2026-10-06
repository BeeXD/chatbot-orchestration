import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Button } from '../common/Button';
import { BotOff, Plus, RotateCcw, SearchX } from 'lucide-react';

export function ChatbotEmptyState({ isFiltered = false }) {
  const { 
    setSelectedPlatform, 
    setSearchQuery, 
    setIsCreateModalOpen, 
    currentRole 
  } = useChatbots();

  const handleReset = () => {
    setSelectedPlatform('all');
    setSearchQuery('');
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: isFiltered ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          color: isFiltered ? 'var(--status-danger)' : 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {isFiltered ? <SearchX size={32} /> : <BotOff size={32} />}
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {isFiltered ? "No Matching Chatbots Found" : "No Chatbots Registered Yet"}
      </h3>

      <p style={{ maxWidth: '420px', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        {isFiltered
          ? "We couldn't find any chatbot instances matching your current platform or search filters. Try resetting your criteria or search query."
          : "Get started by registering your first AI chatbot integration across Slack, WhatsApp, Web, Discord, or Microsoft Teams."}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {isFiltered ? (
          <Button
            variant="secondary"
            onClick={handleReset}
            icon={RotateCcw}
          >
            Clear Active Filters
          </Button>
        ) : null}

        {currentRole !== 'Support Agent' && (
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus}
          >
            Create New Chatbot
          </Button>
        )}
      </div>
    </div>
  );
}
