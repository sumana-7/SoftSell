
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Bot } from 'lucide-react';
import ChatMessage, { Message } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatLoading from './ChatLoading';

interface DesktopChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const DesktopChat = ({ 
  isOpen, 
  setIsOpen, 
  messages, 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleKeyDown,
  isLoading,
  messagesEndRef 
}: DesktopChatProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        size="lg"
        className={`rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-softsell-purple hover:bg-softsell-lightPurple'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-softsell-darkPurple border border-softsell-purple rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-softsell-purple/20 p-3 border-b border-softsell-purple/30">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-softsell-purple" />
              <h3 className="font-semibold text-lg">SoftSell Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="flex-grow p-3 overflow-y-auto">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <ChatLoading />}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-softsell-purple/30 bg-softsell-darkPurple">
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleKeyDown={handleKeyDown}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopChat;
