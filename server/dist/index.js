import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });
const app = express();
const router = express.Router();
// Configure CORS with our allowed origins
const corsOrigins = process.env.NODE_ENV === 'development'
    ? ['http://localhost:8081', 'http://localhost:8082', 'http://localhost:5173']
    : ['https://your-production-domain.com'];
app.use(cors({
    origin: corsOrigins,
    credentials: true
}));
app.use(express.json());
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});
const port = process.env.PORT || 3001;
// Define the chat endpoint handler
const handleChatRequest = async (req, res, next) => {
    try {
        const { messages } = req.body;
        if (!process.env.OPENAI_API_KEY) {
            res.status(500).json({ error: 'OpenAI API key is not configured' });
            return;
        }
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        });
        const reply = completion.choices[0].message.content;
        res.json({ reply: reply || 'No response generated' });
    }
    catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: 'Something went wrong with the AI.' });
    }
};
// Mount the chat endpoint
router.post('/chat', handleChatRequest);
// Mount the router under /api
app.use('/api', router);
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`Server listening on http://localhost:${port}`);
});
