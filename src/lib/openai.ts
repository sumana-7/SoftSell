export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  reply: string;
  simulated?: boolean;
  error?: string;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const chatService = {
  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      console.log('Sending request to:', `${API_URL}/chat`);
      console.log('Messages:', messages);

      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        console.error('Response not OK:', {
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries())
        });

        let errorMessage = 'Failed to get response from AI';
        try {
          const errorData: ChatResponse = await res.json();
          console.error('API Error:', errorData);
          if (res.status === 429) {
            errorMessage = 'API rate limit exceeded. Please try again later.';
          } else {
            errorMessage = errorData.error || errorMessage;
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      const data: ChatResponse = await res.json();
      
      if (data.simulated) {
        console.log('Using simulated response');
      }
      
      return data.reply || "I apologize, but I couldn't generate a response.";
    } catch (error) {
      console.error('Error talking to AI:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to get response from AI. Please try again.');
    }
  }
}; 