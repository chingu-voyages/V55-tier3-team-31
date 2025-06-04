import { createContext } from 'react';

export const ChatbotContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  messages: [],
  sendMessage: () => {},
  isTyping: false,
  conversationHistory: [],
});
