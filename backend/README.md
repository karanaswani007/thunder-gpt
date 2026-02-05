# Thunder GPT Backend

Express.js backend for Thunder GPT chatbot powered by Google Gemini API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Add your Gemini API key to `.env`

4. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3000

## API Endpoints

### POST /api/chat
Send a message and get AI response.

### GET /health
Check if server is running.

### GET /api/info
Get API information.

## Development

Run in dev mode with auto-reload:
```bash
npm install --save-dev nodemon
npm run dev
```

## API Key

Get your free API key from: https://makersuite.google.com/app/apikey
