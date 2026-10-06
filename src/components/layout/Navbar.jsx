import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Button } from '../common/Button';
import { 
  Bot, 
  Plus, 
  RotateCcw, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  Menu, 
  Search,
  Sparkles
} from 'lucide-react';

export function Navbar({ onToggleSidebar }) {
  const { 
    currentRole, 
    setCurrentRole, 
    setIsCreateModalOpen, 
    resetDemoData, 
    searchQuery, 
    setSearchQuery,
    loading,
    liveEvent
  } = useChatbots();

  const roles = [
    { id: 'Admin', label: 'Admin (Full Access)', icon: ShieldCheck },
    { id: 'Developer', label: 'Developer (Create & View)', icon: UserCheck },
    { id: 'Support Agent', label: 'Support Agent (Read-Only)', icon: Eye }
  ];

  return (
    <header
      style={{
        height: '70px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Left: Mobile hamburger & Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '420px' }}>
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)'
          }}
          className="mobile-nav-toggle"
        >
          <Menu size={22} />
        </button>

        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Search 
            size={16} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '0.85rem', pointerEvents: 'none' }} 
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chatbots, platforms, intents..."
            aria-label="Search chatbots by name, platform or intents"
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem 0.55rem 2.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--border-focus)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-subtle)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            }}
          />
        </div>
      </div>

      {/* Right: Role Switcher & Action CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Real-Time SSE Stream Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.25rem 0.65rem',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            color: 'var(--status-active)'
          }}
          title={liveEvent ? `Latest event: [${liveEvent.platform}] ${liveEvent.action} (${liveEvent.latency})` : "Listening for live webhook events via SSE"}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--status-active)',
              boxShadow: '0 0 8px var(--status-active)',
              animation: 'pulseGlow 1.2s infinite'
            }}
          />
          <span style={{ fontWeight: '600' }}>
            {liveEvent ? `${liveEvent.platform} Gateway Active` : 'SSE Live Connected'}
          </span>
        </div>
        {/* Role Selector (SRS Sec 2.2) */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
          title="Switch role to simulate conditional UI permissions"
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>Role:</span>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            aria-label="Select user simulation role"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {roles.map(r => (
              <option key={r.id} value={r.id} style={{ background: '#0f172a', color: '#fff' }}>
                {r.id}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Demo Data Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={resetDemoData}
          icon={RotateCcw}
          title="Reset sample chatbots"
          disabled={loading}
        >
          Reset Demo
        </Button>

        {/* Add Chatbot Button (Hidden for Support Agent role) */}
        {currentRole !== 'Support Agent' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus}
          >
            Add Chatbot
          </Button>
        )}
      </div>
    </header>
  );
}
