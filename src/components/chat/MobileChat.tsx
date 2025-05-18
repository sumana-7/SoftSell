
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Bot } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from '@/components/ui/drawer';
import ChatMessage, { Message } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatLoading from './ChatLoading';
import ChatExampleQuestions from './ChatExampleQuestions';

interface MobileChatProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  exampleQuestions: string[];
  handleExampleClick: (question: string) => void;
}

const MobileChat = ({ 
  messages, 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleKeyDown,
  isLoading,
  messagesEndRef,
  exampleQuestions,
  handleExampleClick
}: MobileChatProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="rounded-full shadow-lg bg-softsell-purple hover:bg-softsell-lightPurple"
          >
            <MessageSquare size={24} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh] bg-softsell-darkPurple border-t border-softsell-purple">
          <DrawerHeader className="border-b border-softsell-purple/30">
            <DrawerTitle className="flex items-center gap-2">
              <Bot size={20} className="text-softsell-purple" />
              SoftSell Assistant
            </DrawerTitle>
            <DrawerClose className="absolute right-4 top-4">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </DrawerHeader>
          
          <div className="flex flex-col h-[calc(100%-10rem)] overflow-hidden p-4">
            <div className="overflow-y-auto flex-grow mb-4">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <ChatLoading />}
              <div ref={messagesEndRef} />
            </div>
            
            {!messages.some(msg => !msg.isBot) && (
              <ChatExampleQuestions 
                questions={exampleQuestions} 
                handleExampleClick={handleExampleClick} 
              />
            )}
          </div>
          
          <DrawerFooter className="border-t border-softsell-purple/30 pt-2">
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleKeyDown={handleKeyDown}
              isLoading={isLoading}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileChat;
