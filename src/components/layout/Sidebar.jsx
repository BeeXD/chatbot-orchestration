import React from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { 
  Bot, 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  X,
  ExternalLink
} from 'lucide-react';

export function Sidebar({ isOpen, onClose }) {
  const { 
    activeTab, 
    setActiveTab, 
    selectedPlatform, 
    setSelectedPlatform, 
    currentRole, 
    setIsCreateModalOpen,
    chatbots 
  } = useChatbots();

  const navItems = [
    { id: 'dashboard', label: 'Chatbot Directory', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { id: 'docs', label: 'SRS Architecture Spec', icon: FileText },
  ];

  const platforms = [
    { id: 'all', label: 'All Deployments', count: chatbots.length },
    { id: 'Web', label: 'Web Chat', count: chatbots.filter(b => b.platform === 'Web').length },
    { id: 'WhatsApp', label: 'WhatsApp', count: chatbots.filter(b => b.platform === 'WhatsApp').length },
    { id: 'Slack', label: 'Slack', count: chatbots.filter(b => b.platform === 'Slack').length },
    { id: 'Discord', label: 'Discord', count: chatbots.filter(b => b.platform === 'Discord').length },
    { id: 'Teams', label: 'MS Teams', count: chatbots.filter(b => b.platform === 'Teams').length },
  ];

  const getRoleIcon = () => {
    if (currentRole === 'Admin') return ShieldCheck;
    if (currentRole === 'Developer') return UserCheck;
    return Eye;
  };
  const RoleIcon = getRoleIcon();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1040,
            backdropFilter: 'blur(4px)'
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform var(--transition-normal)',
          zIndex: 1050
        }}
        className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}
      >
        {/* Top: Brand Header */}
        <div>
          <div
            style={{
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.25rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--accent-gradient-glow)'
                }}
              >
                <Bot size={22} color="#ffffff" />
              </div>
              <div>
                <h1 style={{ fontSize: '1rem', fontWeight: '700', lineHeight: 1.1, color: '#fff' }}>
                  ChatBot Forge
                </h1>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Integration Hub
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close sidebar navigation"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
              className="sidebar-close-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Navigation Items */}
          <div style={{ padding: '1.25rem 0.85rem 0.5rem 0.85rem' }}>
            <span style={{ padding: '0 0.5rem', fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Main Navigation
            </span>
            <nav style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? '600' : '400',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Icon size={18} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Platform Quick Filter Section */}
          <div style={{ padding: '1rem 0.85rem', borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Platforms
              </span>
              <Layers size={13} color="var(--text-muted)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {platforms.map(plat => {
                const isSelected = selectedPlatform === plat.id && activeTab === 'dashboard';
                return (
                  <button
                    key={plat.id}
                    onClick={() => {
                      setActiveTab('dashboard');
                      setSelectedPlatform(plat.id);
                      if (onClose) onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span>{plat.label}</span>
                    <span 
                      style={{ 
                        fontSize: '0.7rem', 
                        padding: '0.1rem 0.4rem', 
                        borderRadius: 'var(--radius-full)', 
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {plat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: User Persona / Role Card */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}
            >
              <RoleIcon size={17} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Active Persona
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {currentRole} Role
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
