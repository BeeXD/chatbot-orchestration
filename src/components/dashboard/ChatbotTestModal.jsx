import React, { useState, useEffect, useRef } from 'react';
import { useChatbots } from '../../context/ChatbotContext';
import { Modal } from '../common/Modal';
import { PlatformBadge } from '../common/Badge';
import { api } from '../../services/api';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

export function ChatbotTestModal() {
  const { testingBot, setTestingBot } = useChatbots();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (testingBot) {
      setMessages([
        {
          id: 'msg-welcome',
          sender: 'bot',
          text: testingBot.welcomeMessage || `Hello! I am ${testingBot.name} deployed on ${testingBot.platform}. How can I assist you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setInputValue('');
      setIsTyping(false);
    }
  }, [testingBot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!testingBot) return null;

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const query = inputValue.trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botMsgId = `msg-bot-${Date.now()}`;
    const initialBotMsg = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    setMessages(prev => [...prev, userMsg, initialBotMsg]);
    setInputValue('');
    setIsTyping(true);

    // Call real-time SSE Token Streamer
    await api.streamChatMessage({
      message: query,
      bot: testingBot,
      onToken: (token) => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMsgId) {
            return { ...msg, text: msg.text + token };
          }
          return msg;
        }));
      },
      onComplete: () => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMsgId) {
            return { ...msg, isStreaming: false };
          }
          return msg;
        }));
        setIsTyping(false);
      },
      onError: () => {
        setIsTyping(false);
      }
    });
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: testingBot.welcomeMessage || `Hello! I am ${testingBot.name}. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <Modal
      isOpen={Boolean(testingBot)}
      onClose={() => setTestingBot(null)}
      title={`Live Sandbox — ${testingBot.name}`}
      subtitle={`Simulating ${testingBot.platform} interaction gateway`}
      maxWidth="620px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '480px' }}>
        {/* Top Info Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 0.85rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '0.85rem',
            fontSize: '0.75rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlatformBadge platform={testingBot.platform} />
            <span style={{ color: 'var(--text-muted)' }}>Model: <strong>{testingBot.model}</strong></span>
          </div>

          <button
            onClick={handleResetChat}
            title="Reset conversation"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.72rem'
            }}
          >
            <RefreshCw size={12} />
            Reset
          </button>
        </div>

        {/* Chat Message Scroll Window */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          {messages.map(msg => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '0.65rem',
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '85%'
                }}
              >
                {isBot && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      flexShrink: 0
                    }}
                  >
                    <Bot size={15} />
                  </div>
                )}

                <div>
                  <div
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                      backgroundColor: isBot ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                      color: '#ffffff',
                      fontSize: '0.825rem',
                      lineHeight: 1.45,
                      border: isBot ? '1px solid var(--border-subtle)' : 'none'
                    }}
                  >
                    {msg.text}
                    {msg.isStreaming && (
                      <span 
                        style={{ 
                          display: 'inline-block', 
                          width: '7px', 
                          height: '14px', 
                          backgroundColor: 'var(--accent-primary)', 
                          marginLeft: '4px', 
                          verticalAlign: '-2px',
                          borderRadius: '1px',
                          animation: 'pulseGlow 0.8s infinite' 
                        }} 
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.2rem',
                      textAlign: isBot ? 'left' : 'right'
                    }}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {!isBot && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0
                    }}
                  >
                    <User size={15} />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <Bot size={15} color="var(--accent-primary)" />
              <span>{testingBot.name} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Intent Quick Click Suggestion Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '0.5rem 0', overflowX: 'auto', paddingBottom: '2px' }}>
          <Sparkles size={12} color="var(--accent-secondary)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>Try query:</span>
          {testingBot.intents.slice(0, 3).map((intent, i) => (
            <button
              key={i}
              onClick={() => {
                setInputValue(`Tell me about ${intent}`);
              }}
              style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              "{intent}"
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message ${testingBot.name} on ${testingBot.platform}...`}
            style={{
              flex: 1,
              padding: '0.65rem 0.9rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            style={{
              padding: '0 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--accent-gradient)',
              color: '#ffffff',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              opacity: inputValue.trim() ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
