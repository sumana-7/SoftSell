
import React from 'react';

export type Message = {
  id: string;
  content: string;
  isBot: boolean;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`mb-3 max-w-[85%] ${
        message.isBot ? "mr-auto" : "ml-auto"
      }`}
    >
      <div
        className={`p-3 rounded-lg ${
          message.isBot
            ? "bg-softsell-charcoal text-white"
            : "bg-softsell-purple text-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
