import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api';

const ChatbotContext = createContext(null);

export function ChatbotProvider({ children }) {
  const [chatbots, setChatbots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filtering & Sorting State (SRS Sec 7)
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'name'

  // View Preference (Card layout vs Table rows - SRS Sec 6.2)
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // Active User Role Simulation (SRS Sec 2.2: Admin, Developer, Support Agent)
  const [currentRole, setCurrentRole] = useState('Admin');

  // Active Modals & Selected Bot for Preview/Testing
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingBot, setDeletingBot] = useState(null);
  const [testingBot, setTestingBot] = useState(null);
  const [inspectingBot, setInspectingBot] = useState(null);

  // Active View/Tab in App ('dashboard' | 'analytics' | 'help')
  const [activeTab, setActiveTab] = useState('dashboard');

  // Feedback Notifications (SRS Sec 11 & 12)
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch Chatbots
  const fetchChatbots = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getChatbots();
      setChatbots(data);
    } catch (err) {
      console.error("Failed to fetch chatbots:", err);
      setError(err.message || "Failed to load chatbots. Please try again.");
      addToast("Failed to load chatbots from server.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const [liveEvent, setLiveEvent] = useState(null);
  const [realtimeInteractions, setRealtimeInteractions] = useState(0);

  // Live Server-Sent Events (SSE) Telemetry Stream
  useEffect(() => {
    let eventSource;
    try {
      eventSource = new EventSource('/api/telemetry/stream');
      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'webhook_ping') {
            setLiveEvent(data);
            setRealtimeInteractions(prev => prev + 1);
          }
        } catch (err) {
          console.warn("Telemetry SSE parse error:", err);
        }
      };
    } catch (e) {
      console.warn("EventSource setup error:", e);
    }
    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  useEffect(() => {
    fetchChatbots();
  }, [fetchChatbots]);

  // Create Chatbot Action (SRS Sec 5)
  const createChatbot = async (botPayload) => {
    if (currentRole === 'Support Agent') {
      addToast("Support Agents have read-only permissions and cannot create chatbots.", "warning");
      return false;
    }

    try {
      setActionLoading(true);
      const newBot = await api.createChatbot(botPayload);
      setChatbots(prev => [newBot, ...prev]);
      addToast(`Chatbot "${newBot.name}" created and deployed successfully!`, "success");
      setIsCreateModalOpen(false);
      return true;
    } catch (err) {
      addToast(err.message || "Could not register chatbot.", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Chatbot Action (SRS Sec 8)
  const deleteChatbot = async (id) => {
    if (currentRole === 'Support Agent' || currentRole === 'Developer') {
      addToast(`${currentRole} role is not permitted to delete chatbot instances. Admin permission required.`, "warning");
      return false;
    }

    const botToDelete = chatbots.find(b => b.id === id);
    if (!botToDelete) return false;

    try {
      setActionLoading(true);
      await api.deleteChatbot(id);
      
      // Optimistic/Immediate Visual Update (SRS Sec 8.1)
      setChatbots(prev => prev.filter(b => b.id !== id));
      setDeletingBot(null);
      addToast(`Chatbot "${botToDelete.name}" was permanently deleted.`, "info");
      return true;
    } catch (err) {
      addToast(err.message || "Deletion failed. Please try again.", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Bot Status (Active / Inactive)
  const toggleBotStatus = async (id) => {
    const target = chatbots.find(b => b.id === id);
    if (!target) return;

    if (currentRole === 'Support Agent') {
      addToast("Support Agents cannot alter instance deployment states.", "warning");
      return;
    }

    const newStatus = target.status === 'active' ? 'inactive' : 'active';
    try {
      const updated = await api.updateChatbot(id, { status: newStatus });
      setChatbots(prev => prev.map(b => b.id === id ? updated : b));
      addToast(`"${target.name}" status updated to ${newStatus}.`, "success");
    } catch (err) {
      addToast("Failed to update chatbot status.", "error");
    }
  };

  // Reset to default sample chatbots
  const resetDemoData = async () => {
    try {
      setLoading(true);
      const resetList = await api.resetDatabase();
      setChatbots(resetList);
      addToast("Reset all chatbots to default sample catalog.", "info");
    } catch (err) {
      addToast("Failed to reset demo data.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter & Search Logic (SRS Sec 7: case-insensitive, instant matching)
  const filteredChatbots = useMemo(() => {
    return chatbots.filter(bot => {
      // Platform Match
      const matchesPlatform = selectedPlatform === 'all' || 
        bot.platform.toLowerCase() === selectedPlatform.toLowerCase();

      // Text Query Match (Search across name, description, intents, and platform)
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        bot.name.toLowerCase().includes(q) ||
        bot.description.toLowerCase().includes(q) ||
        bot.platform.toLowerCase().includes(q) ||
        bot.intents.some(intent => intent.toLowerCase().includes(q));

      return matchesPlatform && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [chatbots, selectedPlatform, searchQuery, sortBy]);

  // Aggregate Stats (SRS Sec 4)
  const stats = useMemo(() => {
    const total = chatbots.length;
    const activeCount = chatbots.filter(b => b.status === 'active').length;
    const platformsCount = new Set(chatbots.map(b => b.platform)).size;
    const totalIntents = chatbots.reduce((sum, b) => sum + (b.intents ? b.intents.length : 0), 0);
    const totalInteractions = chatbots.reduce((sum, b) => sum + (b.totalConversations || 0), 0) + realtimeInteractions;

    return {
      total,
      activeCount,
      platformsCount,
      totalIntents,
      totalInteractions
    };
  }, [chatbots, realtimeInteractions]);

  const value = {
    chatbots,
    filteredChatbots,
    stats,
    liveEvent,
    loading,
    actionLoading,
    error,
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentRole,
    setCurrentRole,
    isCreateModalOpen,
    setIsCreateModalOpen,
    deletingBot,
    setDeletingBot,
    testingBot,
    setTestingBot,
    inspectingBot,
    setInspectingBot,
    activeTab,
    setActiveTab,
    toasts,
    addToast,
    removeToast,
    fetchChatbots,
    createChatbot,
    deleteChatbot,
    toggleBotStatus,
    resetDemoData
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbots() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbots must be used within a ChatbotProvider");
  }
  return context;
}
