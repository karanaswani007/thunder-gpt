# 🚀 Thunder GPT Deployment Checklist

Use this checklist to ensure your deployment is complete and working!

## Pre-Deployment

- [ ] Updated `frontend/script.js` with correct backend URL
- [ ] Verified Gemini API key is valid (test at Studios: https://makersuite.google.com/app/apikey)
- [ ] Pushed all changes to GitHub
- [ ] Created `.env` file in backend with `GEMINI_API_KEY`

## Backend Deployment (Render)

- [ ] Created Render account at https://render.com
- [ ] Connected GitHub repository to Render
- [ ] Set up new Web Service with:
  - [ ] **Name**: `thunder-gpt-backend`
  - [ ] **Branch**: `main`
  - [ ] **Root Directory**: `backend`
  - [ ] **Build Command**: `npm install`
  - [ ] **Start Command**: `npm start`
  - [ ] **Environment Variable**: `GEMINI_API_KEY` = your API key

- [ ] Deployment successful (no errors in logs)
- [ ] Backend URL working: `https://your-backend-url.onrender.com/health`
- [ ] Response shows: `{"status":"Thunder GPT backend is running!"}`

## Frontend Deployment (Vercel)

- [ ] Updated backend URL in `frontend/script.js`
- [ ] Created Vercel account at https://vercel.com
- [ ] Deployed frontend repository with:
  - [ ] Root Directory: `frontend`
  - [ ] Framework: None (static)

- [ ] Deployment successful (URL received)
- [ ] Frontend loads without errors
- [ ] Theme switcher works
- [ ] Chat history saves locally

## Production Testing

- [ ] Visit your Vercel frontend URL
- [ ] Send a test message
- [ ] Response comes back from backend
- [ ] Error messages are clear
- [ ] No console errors (check DevTools)
- [ ] Chat history persists after refresh
- [ ] Theme switching works

## Health Checks

### Backend
```bash
curl https://your-backend-url.onrender.com/health
# Expected: {"status":"Thunder GPT backend is running!"}

curl https://your-backend-url.onrender.com/api/info
# Expected: API info JSON response
```

### Frontend
- [ ] Page loads in < 3 seconds
- [ ] All CSS styling displays correctly
- [ ] Message input accepts text
- [ ] Send button is clickable
- [ ] Settings modal opens/closes
- [ ] Theme switcher works

## Production Checklist

- [ ] Custom domain configured (optional)
- [ ] Monitoring enabled (Render dashboard)
- [ ] Error logging set up
- [ ] API usage tracked
- [ ] Backup/recovery plan documented
- [ ] Team members notified
- [ ] Documentation updated with live URLs

## Monitoring

**Weekly**:
- [ ] Check Render logs for errors
- [ ] Monitor Gemini API quota usage
- [ ] Review performance metrics

**Monthly**:
- [ ] Update dependencies: `npm audit fix`
- [ ] Check for Gemini API updates
- [ ] Review cost estimates

## Scaling (If Needed)

- [ ] Upgrade Render plan from Free to Standard
- [ ] Enable auto-scaling on Render
- [ ] Set up monitoring alerts
- [ ] Review API usage patterns

## Troubleshooting Checklist

If deployment fails:

Backend Issues:
- [ ] Check Render logs for build errors
- [ ] Verify `GEMINI_API_KEY` environment variable is set
- [ ] Confirm API key is valid and not revoked
- [ ] Check Port 3000 is not blocked

Frontend Issues:
- [ ] Verify backend URL is correct in `script.js`
- [ ] Check CORS is enabled in backend
- [ ] Confirm backend is running (check /health endpoint)
- [ ] Clear browser cache and hard refresh (Ctrl+Shift+R)

Connection Issues:
- [ ] Ping backend health endpoint
- [ ] Check browser console for errors
- [ ] Verify network connectivity
- [ ] Check firewall/security settings

## Success Criteria

✅ All checks passed when:
- [ ] Frontend loads and displays UI properly
- [ ] Users can type in the input box
- [ ] Messages are sent to backend successfully
- [ ] AI responses appear in the chat
- [ ] Chat history saves and loads correctly
- [ ] No API key prompts appear for users
- [ ] Error messages are helpful
- [ ] Theme switching works smoothly

## Post-Launch

After successful deployment:

1. **Announce** your app to users
2. **Gather feedback** on functionality and UI
3. **Monitor logs** for the first week
4. **Optimize performance** based on usage patterns
5. **Plan scaling** if traffic increases

---

**Status**: ⏳ Not Started / 🔄 In Progress / ✅ Complete

Last Updated: [Date]
Deployed By: [Name]
Live URL: [Your Frontend URL]
