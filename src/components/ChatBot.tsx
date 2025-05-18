import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2, MinimizeIcon, MaximizeIcon } from 'lucide-react';
import { chatService, type ChatMessage } from '@/lib/openai';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    
    setIsLoading(true);
    try {
      // Get AI response
      const response = await chatService.sendMessage(newMessages);
      
      // Add AI response to chat
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again later.' 
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-softsell-purple text-white p-4 rounded-full shadow-lg hover:bg-softsell-lightPurple transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Chat Window */}
      <div
        className={`fixed right-6 bottom-6 bg-white rounded-xl shadow-2xl transition-all duration-300 transform z-50 ${
          isMinimized ? 'w-72 h-14 scale-100' : 'w-96 h-[600px] scale-100'
        } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-xl">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-softsell-purple" />
            <h3 className="font-semibold text-gray-900">SoftSell Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
            >
              {isMinimized ? (
                <MaximizeIcon className="h-4 w-4" />
              ) : (
                <MinimizeIcon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(600px-8rem)] bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-medium text-gray-900">Welcome to SoftSell Assistant!</p>
                  <p className="text-sm mt-2 text-gray-600">
                    How can I help you with software license resale today?
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-softsell-purple text-white'
                          : 'bg-white text-gray-900 border border-gray-100'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-softsell-purple text-gray-900 placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-softsell-purple text-white px-4 py-2 rounded-lg hover:bg-softsell-lightPurple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBot;
