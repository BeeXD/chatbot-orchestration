import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { AVAILABLE_PLATFORMS } from '../../services/mockData';
import { 
  Filter, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  X,
  Search
} from 'lucide-react';

export function FilterBar() {
  const { 
    selectedPlatform, 
    setSelectedPlatform, 
    searchQuery, 
    setSearchQuery, 
    sortBy, 
    setSortBy, 
    viewMode, 
    setViewMode,
    filteredChatbots,
    chatbots
  } = useChatbots();

  const isFilterActive = selectedPlatform !== 'all' || searchQuery.trim() !== '';

  const clearFilters = () => {
    setSelectedPlatform('all');
    setSearchQuery('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '1.5rem',
        backdropFilter: 'var(--glass-blur)'
      }}
    >
      {/* Left: Platform Pill Selectors & Instant Search */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500' }}>
          <Filter size={15} />
          <span>Platform:</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {AVAILABLE_PLATFORMS.map(plat => {
            const isSelected = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                {plat.name}
              </button>
            );
          })}
        </div>

        {/* Clear Filters button if filtered */}
        {isFilterActive && (
          <button
            onClick={clearFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--status-danger)',
              fontSize: '0.75rem',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Right: Sort Options & Grid/Table View Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Result Counter */}
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredChatbots.length}</strong> of {chatbots.length}
        </span>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <ArrowUpDown size={13} color="var(--text-muted)" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort chatbots"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="newest" style={{ background: '#0f172a' }}>Newest First</option>
            <option value="oldest" style={{ background: '#0f172a' }}>Oldest First</option>
            <option value="name" style={{ background: '#0f172a' }}>Name (A-Z)</option>
          </select>
        </div>

        {/* Card vs Table toggle (SRS Sec 6.2) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '2px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
          role="group"
          aria-label="View layout switch"
        >
          <button
            onClick={() => setViewMode('cards')}
            title="Card View"
            aria-pressed={viewMode === 'cards'}
            style={{
              background: viewMode === 'cards' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'cards' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            title="Table View"
            aria-pressed={viewMode === 'table'}
            style={{
              background: viewMode === 'table' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'table' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            <List size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
