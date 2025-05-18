
import { useState, useRef, useEffect } from 'react';
import { Message } from './ChatMessage';

export const EXAMPLE_QUESTIONS = [
  "How do I sell my license?",
  "What software vendors do you support?",
  "How long does payment take?",
  "How much is my license worth?"
];

export const useChatMessages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm SoftSell's virtual assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage = {
      id: userMessageId,
      content: inputValue,
      isBot: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let botResponse = '';
      
      // Simple response logic based on keywords
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes('sell') || lowercaseInput.includes('license')) {
        botResponse = "To sell your software license, simply click 'Get Started' and upload your license details. We'll provide an instant valuation and you can get paid within 48 hours.";
      } else if (lowercaseInput.includes('vendor') || lowercaseInput.includes('support')) {
        botResponse = "We support all major software vendors including Microsoft, Adobe, Oracle, SAP, Autodesk, VMware and 100+ more enterprise software vendors.";
      } else if (lowercaseInput.includes('payment') || lowercaseInput.includes('paid') || lowercaseInput.includes('time')) {
        botResponse = "Once you accept our offer, you'll receive payment within 48 hours. We offer multiple payout methods for your convenience.";
      } else if (lowercaseInput.includes('worth') || lowercaseInput.includes('value')) {
        botResponse = "The value of your license depends on factors like software type, version, and current market demand. Our AI-powered system provides the highest possible valuation by analyzing real-time market conditions.";
      } else {
        botResponse = "Thanks for your message. To better assist you, could you provide more details about your software licenses or specific questions about our service?";
      }
      
      const botMessageId = (Date.now() + 1).toString();
      const botMessage = {
        id: botMessageId,
        content: botResponse,
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleExampleClick = (question: string) => {
    setInputValue(question);
  };

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleExampleClick,
    handleKeyDown,
  };
};
