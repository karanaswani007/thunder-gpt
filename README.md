# Thunder GPT 🌩️⚡

An AI-powered chatbot built with **Google Gemini API**, featuring a **ChatGPT-like interface** with stunning CSS animations and effects.

**🚀 Ready for Cloud Deployment**: Deploy to Vercel (Frontend) + Render (Backend) - No API key needed for users!

## Features

✨ **Modern UI**
- Dark/Light theme support
- Smooth animations and transitions
- Responsive design (Desktop & Mobile)
- Real-time message streaming
- Loading animations

🤖 **AI Capabilities**
- Powered by Google Gemini API
- Multi-turn conversations with context awareness
- Persistent chat history
- Quick action buttons for inspiration

⚡ **Special Effects**
- Thunder bolt icon animation
- Gradient text effects
- Message bubble animations
- Smooth scrolling
- Button hover effects with light reflections
- Loading dots animation
- Modal slide-in effects

🌐 **Cloud Ready**
- Securely stores API key on backend
- Users don't need to enter API keys
- Easily deployable to Vercel + Render
- Production-grade security

## Project Structure

```
Thunder GPT 3.0/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Modern CSS with animations
│   ├── script.js           # Frontend logic & API integration
│   └── README.md           # Frontend documentation
├── backend/
│   ├── server.js           # Express server with Gemini API
│   ├── package.json        # Node.js dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Backend documentation
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## Quick Start

### For Local Development

#### Prerequisites
- Node.js 14+ and npm
- Google Gemini API key (get it from [here](https://makersuite.google.com/app/apikey))
- Modern web browser

#### Installation

1. **Clone or extract the project**
   ```bash
   cd "Thunder GPT 3.0"
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your Gemini API key
   npm start
   ```

3. **Open Frontend**
   - Navigate to `frontend/` folder
   - Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     cd frontend
     python -m http.server 8000
     # Visit http://localhost:8000
     ```

### For Cloud Deployment

**Deploy for FREE to Vercel + Render!** 🚀

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions:

1. Get your Gemini API key
2. Deploy backend to Render (free tier available)
3. Deploy frontend to Vercel (free)
4. Share your app link - no API keys needed!

**Benefits**:
- ✅ Users don't need API keys
- ✅ Secure API key storage on backend
- ✅ Production-grade hosting
- ✅ Auto-scaling and monitoring
- ✅ Custom domain support

## API Setup

### For Local Development

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key
5. Paste it in `backend/.env` file as `GEMINI_API_KEY`

### For Cloud Deployment

When deploying to Render/Vercel:
- Add your Gemini API key to Render environment variables
- Users don't need to provide API keys
- Backend handles all API calls securely

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Features Explained

### Chat Interface
- **Sidebar**: View chat history and start new conversations
- **Main Area**: Display conversations with beautiful message bubbles
- **Input Box**: Type messages (Enter to send, Shift+Enter for new line)
- **Quick Actions**: Pre-loaded prompts for quick inspiration

### Theme Support
- **Dark Mode** (Default): Easy on the eyes
- **Light Mode**: Better for bright environments
- **Auto**: Follows system preferences

### Local Storage
- Chat history saved locally in your browser
- Settings and theme preferences stored locally
- No sensitive data stored on frontend
- Backend securely handles all API key management

## CSS Special Effects

### Animations
- **Fade In/Out**: Smooth appearance transitions
- **Slide Effects**: Messages and sidebar animations
- **Scale Animations**: Modal and button interactions
- **Thunder Bolt**: Animated icon with rotation
- **Loading Bounce**: Animated dots while waiting
- **Gradient Text**: Title with color gradients
- **Hover Effects**: Light reflection on action buttons

### Color Scheme
```
Primary: #10a37f (Green)
Secondary: #6366f1 (Indigo)
Background: #0d0d0d (Dark)
Text: #ececec (Light Gray)
```

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Backend Issues
- **Port 3000 in use**: Change `PORT` in `.env` file
- **GEMINI_API_KEY not found**: Ensure `.env` file has your API key
- **API Key error**: Verify your API key is correct and active
- **CORS error**: Make sure backend is running properly

### Frontend Issues
- **Messages not sending**: Check if backend is running and responding
- **Backend not found**: Verify backend URL is correct in `script.js`
- **Styling issues**: Hard refresh browser (Ctrl+Shift+R)

### Cloud Deployment Issues
See [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section for:
- Backend not responding on Render
- Frontend can't connect to backend
- API quota exceeded errors

## API Endpoints

### POST `/api/chat`
Send a message and get AI response.

**Request:**
```json
{
  "message": "What is quantum computing?",
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Quantum computing is...",
  "message": "What is quantum computing?"
}
```

*Note: API key is handled securely on the backend via `GEMINI_API_KEY` environment variable*

### GET `/health`
Check if backend is running.

**Response:**
```json
{
  "status": "Thunder GPT backend is running!"
}
```

### GET `/api/info`
Get API information and available models.

**Response:**
```json
{
  "name": "Thunder GPT",
  "version": "1.0.0",
  "description": "AI Chatbot powered by Google Gemini",
  "models": ["gemini-pro"],
  "features": ["Multi-turn conversation", "Context awareness", "Real-time responses"]
}
```

## Development

### Frontend Development
- Edit `frontend/styles.css` for styling
- Edit `frontend/script.js` for functionality
- Edit `frontend/index.html` for structure

### Backend Development
- Install dev dependencies: `npm install --save-dev nodemon`
- Run in dev mode: `npm run dev`
- The server auto-restarts on file changes

## Environment Variables

Backend `.env` file:
```
GEMINI_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

## Performance Tips

1. **API Key**: Each API call uses your quota. Monitor usage on Google AI Studio
2. **Message Length**: Longer conversations use more tokens
3. **Caching**: Chat history is saved locally to reduce API calls
4. **Cleanup**: Regularly clear old chats to free up browser storage

## Security Notes

- API key is stored in browser's localStorage
- Consider using a secure backend to handle API keys if deploying
- Never commit `.env` files with real API keys
- Implement rate limiting in production

## Future Enhancements

- [ ] Export chat history as JSON/PDF
- [ ] User accounts and cloud sync
- [ ] Voice input/output
- [ ] Code syntax highlighting
- [ ] Image support
- [ ] Plugin system
- [ ] Advanced settings (temperature, tokens, etc.)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Credits

- **Frontend**: Modern HTML/CSS/JavaScript
- **Backend**: Express.js with Node.js
- **AI Model**: Google Gemini API
- **Icons**: Font Awesome 6
- **Inspiration**: ChatGPT interface design

## Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for errors (F12)
4. Verify your Gemini API key is valid

---

**Made with ⚡ Thunder GPT Team**

Transform your conversations with the power of AI! 🚀
