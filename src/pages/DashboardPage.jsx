import React from 'react';
import { useChatbots } from '../context/ChatbotContext';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { FilterBar } from '../components/dashboard/FilterBar';
import { ChatbotCard } from '../components/dashboard/ChatbotCard';
import { ChatbotTable } from '../components/dashboard/ChatbotTable';
import { ChatbotEmptyState } from '../components/dashboard/ChatbotEmptyState';
import { SkeletonCard } from '../components/feedback/SkeletonCard';
import { Button } from '../components/common/Button';
import { Plus, Bot, AlertTriangle, RefreshCw } from 'lucide-react';

export function DashboardPage() {
  const { 
    filteredChatbots, 
    loading, 
    error, 
    viewMode, 
    fetchChatbots, 
    setIsCreateModalOpen,
    currentRole,
    selectedPlatform,
    searchQuery
  } = useChatbots();

  const isFiltered = selectedPlatform !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="animate-fade-in">
      {/* Top Header Hero */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Management Console
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Chatbot Orchestration
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Deploy, monitor, and configure AI chatbot instances across enterprise messaging gateways.
          </p>
        </div>

        {currentRole !== 'Support Agent' && (
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus}
          >
            Deploy New Bot
          </Button>
        )}
      </div>

      {/* Aggregate Stats Overview (SRS Sec 4) */}
      <StatsOverview />

      {/* Error Alert Banner if fetch fails */}
      {error && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--status-danger)',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={20} />
            <span style={{ fontSize: '0.875rem' }}>{error}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchChatbots}
            icon={RefreshCw}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Filter and View Mode Switcher (SRS Sec 7) */}
      <FilterBar />

      {/* Content Area: Loading vs Empty vs Data Display */}
      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {[1, 2, 3, 4, 5, 6].map(key => (
            <SkeletonCard key={key} />
          ))}
        </div>
      ) : filteredChatbots.length === 0 ? (
        <ChatbotEmptyState isFiltered={isFiltered} />
      ) : viewMode === 'cards' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredChatbots.map(bot => (
            <ChatbotCard key={bot.id} bot={bot} />
          ))}
        </div>
      ) : (
        <ChatbotTable bots={filteredChatbots} />
      )}
    </div>
  );
}
