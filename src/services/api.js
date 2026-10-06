import { INITIAL_CHATBOTS } from './mockData';

const STORAGE_KEY = 'ai_chatbot_platform_instances';

// Helper to simulate network latency per SRS Sec 10 & 12
const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredBots = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CHATBOTS));
      return INITIAL_CHATBOTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.warn("Storage access failed, using in-memory fallback:", err);
    return INITIAL_CHATBOTS;
  }
};

const saveStoredBots = (bots) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
  } catch (err) {
    console.warn("Failed to save to localStorage:", err);
  }
};

export const api = {
  // GET /api/chatbots
  async getChatbots() {
    await delay(350);
    return [...getStoredBots()];
  },

  // POST /api/chatbots
  async createChatbot(chatbotData) {
    await delay(500);

    // Validate per SRS Sec 5.3
    if (!chatbotData.name || chatbotData.name.trim().length < 3) {
      throw new Error("Chatbot name must be at least 3 characters long.");
    }
    if (!chatbotData.platform) {
      throw new Error("Target platform must be specified.");
    }
    if (!chatbotData.intents || chatbotData.intents.length === 0) {
      throw new Error("At least one intent must be assigned to the chatbot.");
    }

    const currentBots = getStoredBots();
    const newBot = {
      id: `bot-${Date.now()}`,
      name: chatbotData.name.trim(),
      platform: chatbotData.platform,
      description: chatbotData.description?.trim() || "Multi-platform AI assistant.",
      intents: chatbotData.intents.map(i => i.trim()),
      status: chatbotData.status || "active",
      environment: chatbotData.environment || "Development",
      model: chatbotData.model || "GPT-4o",
      createdAt: new Date().toISOString(),
      totalConversations: 0,
      successRate: "100%",
      welcomeMessage: chatbotData.welcomeMessage?.trim() || `Hello! I am your ${chatbotData.name} on ${chatbotData.platform}.`
    };

    const updated = [newBot, ...currentBots];
    saveStoredBots(updated);
    return newBot;
  },

  // DELETE /api/chatbots/:id
  async deleteChatbot(id) {
    await delay(400);
    const currentBots = getStoredBots();
    const exists = currentBots.some(b => b.id === id);
    if (!exists) {
      throw new Error(`Chatbot with ID ${id} not found.`);
    }
    const filtered = currentBots.filter(b => b.id !== id);
    saveStoredBots(filtered);
    return { success: true, id };
  },

  // PATCH /api/chatbots/:id (toggle status or update)
  async updateChatbot(id, updates) {
    await delay(300);
    const currentBots = getStoredBots();
    const idx = currentBots.findIndex(b => b.id === id);
    if (idx === -1) {
      throw new Error(`Chatbot with ID ${id} not found.`);
    }
    const updatedBot = { ...currentBots[idx], ...updates };
    currentBots[idx] = updatedBot;
    saveStoredBots(currentBots);
    return updatedBot;
  },

  // Reset to default sample dataset
  async resetDatabase() {
    await delay(300);
    saveStoredBots(INITIAL_CHATBOTS);
    return [...INITIAL_CHATBOTS];
  },

  /**
   * Server-Sent Events (SSE) LLM Token Streamer
   * Connects to backend /api/chat/stream, falls back to simulated stream if offline
   */
  async streamChatMessage({ message, bot, onToken, onComplete, onError }) {
    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, bot })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || ''; // Keep unfinished chunk in buffer

        for (const block of lines) {
          const trimmed = block.trim();
          if (trimmed.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmed.replace(/^data:\s*/, ''));
              if (data.token) {
                onToken(data.token);
              }
              if (data.done) {
                if (onComplete) onComplete();
                return;
              }
            } catch (jsonErr) {
              console.warn("SSE json parse error:", jsonErr);
            }
          }
        }
      }

      if (onComplete) onComplete();
    } catch (err) {
      console.warn("Backend SSE stream unreachable, utilizing client-side stream generator:", err);
      // Client-side fallback token generator
      const botName = bot?.name || 'AI Assistant';
      const intents = bot?.intents || [];
      const reply = `[Real-Time Gateway] Inbound query received. Dispatched to ${bot.platform} webhook for ${botName}. Configured intents: ${intents.join(', ')}.`;
      const words = reply.split(' ');

      for (let i = 0; i < words.length; i++) {
        const word = (i === 0 ? '' : ' ') + words[i];
        onToken(word);
        await new Promise(res => setTimeout(res, 40));
      }
      if (onComplete) onComplete();
    }
  }
};
