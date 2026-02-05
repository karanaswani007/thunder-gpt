const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Store conversation contexts for multi-turn conversations
const conversationContexts = new Map();

// Initialize Gemini AI
function initializeGemini() {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('GEMINI_API_KEY is not configured. Set it in your .env file or environment variables.');
    }
    return new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Thunder GPT backend is running!' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }

        // Initialize Gemini with backend API key
        const genAI = initializeGemini();
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Build conversation history for context
        const conversationHistory = [];
        
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                conversationHistory.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                });
            });
        }

        // Start chat with history
        const chat = model.startChat({
            history: conversationHistory,
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.7,
                topP: 1,
                topK: 1,
            },
        });

        // Send the message and get response
        const result = await chat.sendMessage(message);
        const response = result.response;
        const responseText = response.text();

        res.json({
            success: true,
            response: responseText,
            message: message
        });

    } catch (error) {
        console.error('Error in /api/chat:', error);
        
        let errorMessage = 'An error occurred while processing your request';
        
        if (error.message.includes('API key')) {
            errorMessage = 'Invalid or expired API key. Please check your Gemini API key in settings.';
        } else if (error.message.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later.';
        } else if (error.message.includes('network')) {
            errorMessage = 'Network error. Please check your internet connection.';
        }

        res.status(500).json({
            error: errorMessage,
            details: error.message
        });
    }
});

// Get API info endpoint
app.get('/api/info', (req, res) => {
    res.json({
        name: 'Thunder GPT',
        version: '1.0.0',
        description: 'AI Chatbot powered by Google Gemini',
        models: ['gemini-pro'],
        features: ['Multi-turn conversation', 'Context awareness', 'Real-time responses']
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║                    Thunder GPT Backend                    ║
    ║              Powered by Google Gemini API                 ║
    ╚══════════════════════════════════════════════════════════╝
    
    Server is running on: http://localhost:${PORT}
    Health check: http://localhost:${PORT}/health
    API Info: http://localhost:${PORT}/api/info
    
    🔌 CORS enabled
    ✅ API key loaded from environment variables
    📝 Ready to process chat messages
    
    Tips:
    - Gemini API key is securely loaded from GEMINI_API_KEY environment variable
    - Frontend users do not need to provide an API key
    - Use Ctrl+C to stop the server
    `);
});

module.exports = app;
