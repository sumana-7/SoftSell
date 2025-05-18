
import React from 'react';

const ChatLoading = () => {
  return (
    <div className="mb-3 max-w-[85%] mr-auto">
      <div className="p-3 rounded-lg bg-softsell-charcoal text-white">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div 
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" 
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div 
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" 
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
