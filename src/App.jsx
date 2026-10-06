import React, { useState } from 'react';
import { ChatbotProvider, useChatbots } from './context/ChatbotContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DocsPage } from './pages/DocsPage';
import { ChatbotCreateModal } from './components/forms/ChatbotCreateModal';
import { DeleteConfirmModal } from './components/dashboard/DeleteConfirmModal';
import { ChatbotTestModal } from './components/dashboard/ChatbotTestModal';
import { ChatbotDetailModal } from './components/dashboard/ChatbotDetailModal';
import { ToastContainer } from './components/common/Toast';
import './styles/globals.css';

function MainAppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeTab } = useChatbots();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'docs':
        return <DocsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        <main className="page-wrapper">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Dialogs */}
      <ChatbotCreateModal />
      <DeleteConfirmModal />
      <ChatbotTestModal />
      <ChatbotDetailModal />

      {/* Global Feedback Toasts */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ChatbotProvider>
      <MainAppShell />
    </ChatbotProvider>
  );
}
