
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleKeyDown,
  isLoading 
}: ChatInputProps) => {
  return (
    <div className="flex gap-2">
      <Textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="min-h-10 resize-none border-softsell-purple/30"
      />
      <Button
        onClick={handleSendMessage}
        variant="default"
        size="icon"
        disabled={!inputValue.trim() || isLoading}
        className="bg-softsell-purple hover:bg-softsell-lightPurple"
      >
        <Send size={18} />
      </Button>
    </div>
  );
};

export default ChatInput;
