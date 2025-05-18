import dotenv from 'dotenv';
import { join } from 'path';

// Using Node's built-in __dirname (already available in CommonJS)
const rootDir = join(__dirname, '..');

// Load environment variables from .env file
dotenv.config({ path: join(rootDir, '.env') });

export const config = {
  port: process.env.PORT || 3001,
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  isDevelopment: process.env.NODE_ENV === 'development',
  corsOrigin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:8081', 'http://localhost:5173'] 
    : ['https://your-production-domain.com']
}; 