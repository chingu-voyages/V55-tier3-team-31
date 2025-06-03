import React, { createContext, useContext, useState, useCallback } from 'react';
import { useResourcesContext } from './resourceContext';

const ChatbotContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  messages: [],
  sendMessage: () => {},
  isTyping: false
});

export const ChatbotContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Resource Helper assistant. How can I help you find resources today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const { resources, setSearchText, setFilteredResources, searchText } = useResourcesContext();

  const searchResources = useCallback((query) => {
    const filtered = resources.filter(resource => 
      resource.name.toLowerCase().includes(query.toLowerCase()) ||
      resource.appliedTagsName?.some(tag => 
        tag.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredResources(filtered);
    setSearchText(query);
    return filtered;
  }, [resources, setFilteredResources, setSearchText]);

  const getBotResponse = useCallback((userInput) => {
    const input = userInput.toLowerCase();
    
    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to help you find the perfect learning resources. What topic are you interested in?";
    }
    
    // Technology-specific searches
    if (input.includes('javascript') || input.includes('js')) {
      const results = searchResources('javascript');
      return `Great choice! I found ${results.length} JavaScript resources for you. Check the search results above, or ask me about specific JavaScript topics like React, Node.js, or vanilla JavaScript fundamentals.`;
    }
    
    if (input.includes('react')) {
      const results = searchResources('react');
      return `Excellent! I found ${results.length} React resources. These include tutorials, documentation, and advanced concepts. The search results are now displayed above.`;
    }
    
    if (input.includes('python')) {
      const results = searchResources('python');
      return `Python is fantastic! I found ${results.length} Python resources covering web development, data science, and general programming. Check them out above!`;
    }
    
    if (input.includes('css') || input.includes('styling')) {
      const results = searchResources('css');
      return `I found ${results.length} CSS and styling resources for you. These cover everything from basics to advanced techniques like Flexbox, Grid, and animations.`;
    }
    
    if (input.includes('html')) {
      const results = searchResources('html');
      return `Here are ${results.length} HTML resources I found. These cover semantic HTML, accessibility, and modern HTML5 features.`;
    }
    
    if (input.includes('node') || input.includes('backend')) {
      const results = searchResources('node');
      return `I found ${results.length} backend and Node.js resources. These include API development, databases, and server-side programming.`;
    }
    
    // General help
    if (input.includes('help') || input.includes('how to')) {
      return "I can help you in several ways:\n\n• Search for specific technologies or topics\n• Find resources by difficulty level\n• Recommend learning paths\n• Clear your current search\n\nJust tell me what you're looking for!";
    }
    
    if (input.includes('clear') || input.includes('reset')) {
      setSearchText('');
      setFilteredResources([]);
      return "I've cleared your search results! Now you can start fresh. What would you like to search for?";
    }
    
    if (input.includes('beginner') || input.includes('start')) {
      return "Perfect! For beginners, I recommend starting with HTML, CSS, and JavaScript fundamentals. Would you like me to search for beginner-friendly resources in any of these areas?";
    }
    
    if (input.includes('advanced') || input.includes('expert')) {
      return "Looking for advanced topics? Great! I can help you find resources on advanced JavaScript concepts, system design, performance optimization, or specific frameworks. What area interests you most?";
    }
    
    // Try to search for the input as a general query
    const results = searchResources(input);
    if (results.length > 0) {
      return `I found ${results.length} resources related to "${userInput}". The results are now displayed above. Feel free to ask for more specific recommendations!`;
    }
    
    // Default response
    return `That's interesting! I couldn't find specific resources for "${userInput}", but you can:\n\n• Try different keywords\n• Browse all ${resources.length} available resources\n• Ask me about popular topics like JavaScript, React, Python, or CSS\n\nWhat would you like to explore?`;
  }, [searchResources, resources.length, setSearchText, setFilteredResources]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // Random delay between 0.8-2s
  }, [getBotResponse]);

  const value = {
    isOpen,
    setIsOpen,
    messages,
    sendMessage,
    isTyping
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotContextProvider');
  }
  return context;
};
