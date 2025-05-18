
import React from 'react';

interface ChatExampleQuestionsProps {
  questions: string[];
  handleExampleClick: (question: string) => void;
}

const ChatExampleQuestions = ({ questions, handleExampleClick }: ChatExampleQuestionsProps) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-white/70 mb-2">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(question)}
            className="text-xs text-left px-2 py-1 bg-softsell-purple/20 text-white/90 rounded-lg hover:bg-softsell-purple/30"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatExampleQuestions;
