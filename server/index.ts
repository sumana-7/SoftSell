import type { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// Initialize OpenAI if API key is available
let openai: any = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
} else {
  console.warn('No OpenAI API key found, falling back to simulated responses');
}

// Configure CORS
const isDevelopment = process.env.NODE_ENV === 'development';
const corsOptions = {
  origin: isDevelopment 
    ? (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // Allow any localhost origin in development
        if (origin.startsWith('http://localhost:')) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
      }
    : ['https://your-production-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// System message for context
const SYSTEM_MESSAGE = `You are an AI assistant for the SoftSell marketplace, specializing in software license resale.
Your role is to help users understand:
- Software license pricing and valuation
- The process of buying and selling licenses
- Security and verification procedures
- Supported vendors and their specific requirements
- General marketplace operations

Keep responses focused on software licensing and maintain a professional, helpful tone.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface ChatResponse {
  reply: string;
  simulated: boolean;
  error?: string;
}

// Chat endpoint handler
const handleChatRequest = async (req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse>) => {
  try {
    const { messages } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      // Fallback to simulated responses if no API key
      const simulatedResponse = getSimulatedResponse(messages[messages.length - 1].content);
      res.json({
        reply: simulatedResponse,
        simulated: true
      });
      return;
    }

    // Prepare messages for OpenAI
    const chatMessages = [
      { role: 'system', content: SYSTEM_MESSAGE },
      ...messages
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({
      reply: completion.choices[0].message.content,
      simulated: false
    });
  } catch (error) {
    console.error('Chat error:', error);
    
    // Fallback to simulated response on error
    const simulatedResponse = getSimulatedResponse(req.body.messages[req.body.messages.length - 1].content);
    res.json({
      reply: simulatedResponse,
      simulated: true,
      error: 'Failed to get OpenAI response, falling back to simulated response'
    });
  }
};

// Simulated responses based on keywords
const simulatedResponses = {
  greeting: "Welcome to SoftSell! I'm your AI assistant specializing in software license resale. I can help you with pricing, buying/selling processes, security verification, and marketplace information. How can I assist you today?",
  
  pricing: `Here's how software license pricing works on SoftSell:
1. Prices typically range from 40-70% of original retail cost
2. Factors affecting price:
   - License type (perpetual vs subscription)
   - Remaining subscription duration
   - Version and features included
   - Market demand and availability
3. Our platform provides real-time market data to help you set competitive prices
4. You can also get an instant price estimate using our valuation tool`,

  process: `The software license resale process on SoftSell is secure and straightforward:
1. List Your License:
   - Provide license details and documentation
   - Set your asking price
   - Upload proof of ownership
2. Verification:
   - Our team verifies license authenticity
   - Compliance check with vendor policies
3. Transaction:
   - Buyer makes secure payment through our platform
   - Funds are held in escrow
4. Transfer:
   - License transfer is facilitated through vendor's official process
   - Our team assists with documentation
5. Completion:
   - Funds released after successful transfer
   - Both parties confirm completion`,

  security: `SoftSell's security measures include:
1. License Verification:
   - Multi-point authentication system
   - Direct verification with software vendors
   - Document authenticity checks
2. Transaction Security:
   - Escrow payment protection
   - Encrypted communications
   - Secure payment processing (PCI compliant)
3. Platform Security:
   - 2FA for all accounts
   - Regular security audits
   - Fraud prevention systems
4. Compliance:
   - GDPR compliant
   - Vendor-approved transfer processes
   - Full transaction documentation`,

  vendors: `SoftSell supports major software vendors including:
1. Microsoft:
   - Windows Server licenses
   - Microsoft 365 subscriptions
   - Visual Studio licenses
2. Adobe:
   - Creative Cloud licenses
   - Acrobat DC
   - Enterprise packages
3. Oracle:
   - Database licenses
   - Middleware
   - Enterprise applications
4. VMware:
   - vSphere licenses
   - vCenter
   - Workspace ONE
5. Other Popular Vendors:
   - Autodesk
   - IBM
   - SAP
Each vendor has specific transfer requirements which we help facilitate.`,

  default: `I'm here to help you navigate the SoftSell marketplace for software license resale. Here are some topics I can assist with:
1. License valuation and pricing strategies
2. Buying and selling processes
3. Security and verification procedures
4. Vendor-specific requirements
5. Market trends and opportunities
What specific information would you like to know?`
};

// Helper function to get the most relevant simulated response
const getSimulatedResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi ') || message.includes('hey') || message.includes('welcome')) {
    return simulatedResponses.greeting;
  }
  if (message.includes('price') || message.includes('cost') || message.includes('worth') || message.includes('value') || message.includes('estimate')) {
    return simulatedResponses.pricing;
  }
  if (message.includes('process') || message.includes('how to') || message.includes('steps') || message.includes('sell') || message.includes('buy')) {
    return simulatedResponses.process;
  }
  if (message.includes('secure') || message.includes('safe') || message.includes('security') || message.includes('protect')) {
    return simulatedResponses.security;
  }
  if (message.includes('vendor') || message.includes('microsoft') || message.includes('adobe') || message.includes('oracle') || 
      message.includes('vmware') || message.includes('autodesk') || message.includes('ibm') || message.includes('sap')) {
    return simulatedResponses.vendors;
  }
  
  return simulatedResponses.default;
};

// Add root route handler
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'SoftSell API is running' });
});

// Mount the chat endpoint
app.post('/api/chat', handleChatRequest);

const port = 3001;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Server listening on http://localhost:${port}`);
});
