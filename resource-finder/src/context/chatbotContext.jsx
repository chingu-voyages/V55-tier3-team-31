import React, { useState, useCallback } from 'react';
import { ChatbotContext } from './chatbotContextDefinition';
import { useResourcesContext } from './resourceContext';

export const ChatbotContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Resource Helper assistant.\nHow can I help you find resources today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const { resources, setSearchText, setFilteredResources } =
    useResourcesContext();

  const searchResources = useCallback(
    (query) => {
      const filtered = resources.filter(
        (resource) =>
          resource.name.toLowerCase().includes(query.toLowerCase()) ||
          resource.appliedTagsName?.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredResources(filtered);
      setSearchText(query);
      return filtered;
    },
    [resources, setFilteredResources, setSearchText]
  );

  // AI-powered response using Cloudflare Worker
  const getAIResponse = useCallback(async (userMessage, searchResults = []) => {
    try {
      console.log("does this exist", import.meta.env.VITE_CLOUDFLARE_WORKER_URL)
      const response = await fetch(import.meta.env.VITE_CLOUDFLARE_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage,
          conversationHistory,
          resources: resources.slice(0, 50),
          searchResults: searchResults.slice(0, 10),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      setConversationHistory(data.conversationHistory);
      return data.response;
    } catch (aiError) {
      console.error('Error fetching AI response:', aiError);
      return "I'm sorry, I couldn't process your request. Please try again later.";
    }
  }, [conversationHistory, resources]);

  // Fallback to rule-based responses for common queries
  const getFallbackResponse = useCallback(
    (userInput) => {
      const input = userInput.toLowerCase();

      // Check for search-triggering keywords
      const searchKeywords = [
        'javascript',
        'react',
        'python',
        'css',
        'html',
        'node',
      ];
      const matchedKeyword = searchKeywords.find((keyword) =>
        input.includes(keyword)
      );

      if (matchedKeyword) {
        const results = searchResources(matchedKeyword);
        return `Found ${results.length} ${matchedKeyword} resources! Check the search results above.`;
      }

      if (input.includes('clear') || input.includes('reset')) {
        setSearchText('');
        setFilteredResources([]);
        return "✨ I've cleared your search results!";
      }

      return "I'm here to help you find programming resources! Try asking about JavaScript, React, Python, or any other technology.";
    },
    [searchResources, setSearchText, setFilteredResources]
  );

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;

      const userMessage = {
        id: Date.now(),
        text: text,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
        // Get current search results for context
        const currentSearchResults = searchResources(text);

        // Try AI response first
        const responseText = await getAIResponse(text, currentSearchResults);

        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botResponse]);
      } catch (aiError) {
        console.error('AI response failed:', aiError);
        // Fallback to rule-based response
        const fallbackText = getFallbackResponse(text);
        const botResponse = {
          id: Date.now() + 1,
          text: fallbackText,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } finally {
        setIsTyping(false);
      }
    },
    [getAIResponse, getFallbackResponse, searchResources]
  );

  const value = {
    isOpen,
    setIsOpen,
    messages,
    sendMessage,
    isTyping,
    conversationHistory,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};
