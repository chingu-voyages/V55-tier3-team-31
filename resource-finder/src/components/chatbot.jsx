import React, { useState, useRef, useEffect } from 'react';
import ChatIcon from '../assets/chat-icon.png';
import { useChatbot } from '../hooks/useChatbot';

export default function Chatbot() {
  const { isOpen, setIsOpen, messages, sendMessage, isTyping } = useChatbot();
  const [inputText, setInputText] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Show notification badge for new bot messages when chat is closed
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      // Hide welcome message after first interaction
      if (messages.length > 1) {
        setShowWelcome(false);
      }
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    await sendMessage(inputText);
    setInputText('');
    setShowWelcome(false); // Hide welcome after first message
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { label: "🟨 JavaScript", action: "javascript" },
    { label: "⚛️ React", action: "react" },
    { label: "🐍 Python", action: "python" },
    { label: "🎨 CSS", action: "css" }
  ];

  const conversationStarters = [
    "What's the best way to learn JavaScript?",
    "Show me React tutorials",
    "I need Python resources for beginners",
    "Help me find CSS animation tutorials"
  ];

  const handleQuickAction = (action) => {
    sendMessage(action);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-primary hover:bg-primary/80 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <img 
          src={ChatIcon} 
          alt="Chat" 
          className="w-8 h-8 filter brightness-0 invert"
        />
        {hasNewMessage && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden transition-all duration-300">
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={ChatIcon} 
                  alt="Resource Helper" 
                  className="w-8 h-8 filter brightness-0 invert mr-3"
                />
                <div>
                  <h3 className="text-white font-semibold">Resource Helper AI</h3>
                  <p className="text-white/80 text-sm">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 p-1"
                aria-label="Close chat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-background hide-scrollbar">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl transition-all duration-300 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-card/80 text-background rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-background/50'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card/80 text-background p-3 rounded-2xl rounded-bl-md max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-background/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-background/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-background/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-background/10">
              {/* Quick Actions and Conversation Starters */}
              {(messages.length <= 1 || showWelcome) && (
                <div className="mb-3 space-y-3 animate-fade-in">
                  <div>
                    <p className="text-xs text-background/60 mb-2">Quick searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <button
                          key={action.action}
                          onClick={() => handleQuickAction(action.action)}
                          className="px-3 py-1 bg-primary/20 text-background text-xs rounded-full hover:bg-primary/30 transition-colors duration-200"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-background/60 mb-2">Or try asking:</p>
                    <div className="space-y-1">
                      {conversationStarters.map((starter, index) => (
                        <button
                          key={index}
                          onClick={() => sendMessage(starter)}
                          className="block w-full text-left px-2 py-1 text-xs text-background/70 hover:text-background hover:bg-background/10 rounded transition-colors duration-200"
                        >
                          "{starter}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full p-3 bg-background text-white rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows="1"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-white p-3 rounded-xl transition-colors duration-200"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
