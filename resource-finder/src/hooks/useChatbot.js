import { useContext } from 'react';
import { ChatbotContext } from '../context/chatbotContextDefinition';

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotContextProvider');
  }
  return context;
};
