# 🚀 Thunder GPT - Deployment Guide

## Quick Setup Overview

This guide helps you deploy Thunder GPT to the cloud for free using:
- **Frontend**: Vercel (React-like static deployment)
- **Backend**: Render.com (Node.js hosting)

No users need to enter API keys - it's all handled securely on the backend! ⚡

---

## 📋 Prerequisites

Before deploying, you need:
1. **Gemini API Key**: Get your free key from https://makersuite.google.com/app/apikey
2. **GitHub Account**: For deploying (both services integrate with GitHub)
3. **Vercel Account**: Sign up at https://vercel.com (free)
4. **Render Account**: Sign up at https://render.com (free)

---

## 🔑 Step 1: Get Your Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Click **"Create API Key"**
3. Choose **"Create API key in new project"**
4. Copy your API key (you'll need this for backend deployment)
5. Keep it safe! 🔒

---

## 📤 Step 2: Deploy Backend to Render.com

### Option A: Using render.yaml (Recommended)

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git config user.email "your-email@example.com"
   git config user.name "Your Name"
   git commit -m "Initial Thunder GPT setup"
   git remote add origin https://github.com/YOUR_USERNAME/thunder-gpt.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Render**:
   - Go to https://dashboard.render.com
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Select the repository with Thunder GPT

3. **Configure the service**:
   - **Name**: `thunder-gpt-backend`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variable**:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Paste your Gemini API key (from Step 1)
   - Click **"Create Web Service"**

**Alternative: Use Render CLI to set the env var (example)**

```bash
# Install Render CLI if you haven't
npm install -g render

# Log in and set the variable for your service
render login
render env set thunder-gpt-backend GEMINI_API_KEY "<YOUR_GEMINI_API_KEY>"
```

5. **Wait for deployment** (2-3 minutes)
   - Your backend will be live at: `https://thunder-gpt-backend.onrender.com`
   - Note this URL for the frontend configuration

### Option B: Manual Deployment via CLI

```bash
# Install Render CLI
npm install -g render

# Login to Render
render login

# Create new service
cd backend
render create-web-service --name thunder-gpt-backend

# Set environment variable
render env set GEMINI_API_KEY "your-api-key"

# Deploy
render deploy
```

---

## 🎨 Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. **Update backend URL in frontend**:
   - Open `frontend/script.js`
   - Find the `getBackendUrl()` function
   - Update it to use your Render backend URL:
   ```javascript
   getBackendUrl() {
       if (window.location.hostname === 'localhost') {
           return 'http://localhost:3000';
       }
       return 'https://your-backend-url.onrender.com'; // Your Render backend URL
   }
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update backend URL for production"
   git push
   ```

3. **Connect to Vercel**:
   - Go to https://vercel.com/import
   - Select your GitHub repository
   - Click **"Import Project"**

4. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - Click **"Deploy"**

5. **Done!** 🎉
   - Vercel will give you a live URL
   - Example: `https://thunder-gpt-frontend.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel deploy

# Follow the prompts
# Your frontend will be live!
```

---

## 🔄 Step 4: Connect Frontend to Backend

### If using manual Render configuration:

1. Open your Render service dashboard
2. Note the URL (e.g., `https://thunder-gpt-backend.onrender.com`)
3. Update `frontend/script.js`:
   ```javascript
   getBackendUrl() {
       if (window.location.hostname === 'localhost') {
           return 'http://localhost:3000';
       }
       return 'https://your-backend-url.onrender.com';
   }
   ```

4. Push changes:
   ```bash
   git add .
   git commit -m "Update backend URL"
   git push
   ```

5. Vercel auto-redeploys on push ✅

### If using render.yaml:

The backend URL will be: `https://thunder-gpt-backend.onrender.com`

---

## ✅ Testing Your Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```
   Expected response: `{"status":"Thunder GPT backend is running!"}`

2. **Visit Your App**:
   - Open your Vercel frontend URL
   - Click "Send a message"
   - It should work instantly! No API key needed 🎉

---

## 🐛 Troubleshooting

### Backend not responding
- Check that `GEMINI_API_KEY` is set in Render environment variables
- Verify your Gemini API key is valid
- Check Render logs for errors

### Frontend can't connect to backend
- Verify the backend URL in `getBackendUrl()`
- Check CORS settings (should be enabled in server.js)
- Ensure backend is running (check Render dashboard)

### API quota exceeded
- You're hitting Gemini API limits
- Wait a few minutes or upgrade your API plan

---

## 📱 For Production Use

To make your app production-ready:

1. **Add custom domain**:
   - Vercel: Add domain in project settings
   - Render: Add custom domain in service settings

2. **Enable auto-scaling** (Render paid plan):
   - Switch from "Free" to "Standard" plan

3. **Monitor usage**:
   - Render dashboard shows API calls and costs
   - Keep Gemini API usage in check

4. **Enable analytics** (Vercel):
   - Set up performance monitoring

---

## 🎯 Summary

Your deployment is complete! 🚀

- **Frontend**: Hosted on Vercel (free)
- **Backend**: Hosted on Render (free tier available)
- **API Key**: Securely stored on backend
- **Users**: No technical setup needed!

Just share your Vercel URL and users can start chatting immediately! ⚡

---

## 📚 Useful Links

- [Gemini API Docs](https://ai.google.dev/)
- [Render Documentation](https://docs.render.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Google Generative AI SDK](https://github.com/google/generative-ai-js)

---

## 💬 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review service logs (Render/Vercel dashboard)
3. Verify API key is correct and valid
4. Ensure environment variables are set properly

Good luck! 🚀✨
