# Deployment Guide

## What Was Added

✅ **Click Tracking System**
- Automatic tracking on all CTA buttons (F2F, OnlyFans, WhatsApp, Telegram)
- REST API endpoints for tracking and analytics
- Beautiful analytics dashboard at `/analytics`
- Data persists in JSON file

## Files Added/Modified

### New Files:
- `app/api/track/route.ts` - API endpoint to track clicks
- `app/api/analytics/route.ts` - API endpoint to get analytics
- `app/analytics/page.tsx` - Analytics dashboard page
- `TRACKING.md` - API documentation
- `DEPLOYMENT.md` - This file

### Modified Files:
- `app/(components)/CTAButton.tsx` - Added tracking functionality
- `app/page.tsx` - Added tracking to WhatsApp button
- `.gitignore` - Added `/data/` folder to exclude tracking data from git

## Local Testing Summary

✅ All tests passed!
- Tracking API works: `POST /api/track`
- Analytics API works: `GET /api/analytics`
- Front-end button clicks are tracked automatically
- Analytics dashboard displays correctly
- Data persists in `/data/clicks.json`

## Push to GitHub

```bash
# Navigate to project
cd "/Users/julianbik/fleurtje landing page/roosjepage"

# Check status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Add click tracking system with API and analytics dashboard"

# Push to GitHub
git push origin main
```

## Deploy to Vercel

### Option 1: Automatic Deployment
If your Vercel project is connected to GitHub:
1. Just push to GitHub (command above)
2. Vercel will automatically detect changes and deploy
3. Wait 1-2 minutes for deployment to complete

### Option 2: Manual Deployment via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel --prod
```

## After Deployment

### Test Your Live Site

1. **Test the landing page:**
   ```
   https://your-domain.vercel.app
   ```
   Click on the CTA buttons (F2F, OnlyFans, WhatsApp, Telegram)

2. **View analytics dashboard:**
   ```
   https://your-domain.vercel.app/analytics
   ```

3. **Test API directly:**
   ```bash
   # Track a click
   curl -X POST https://your-domain.vercel.app/api/track \
     -H "Content-Type: application/json" \
     -d '{"buttonLabel":"F2F","buttonHref":"https://f2f.com/s/QXmPjB"}'
   
   # Get analytics
   curl https://your-domain.vercel.app/api/analytics
   ```

## Using the API from Twitter/External Apps

You can now track clicks from your Twitter interface or any external app:

```javascript
async function trackClick(buttonLabel, buttonHref) {
  await fetch('https://your-domain.vercel.app/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buttonLabel, buttonHref })
  });
}

// Example usage
trackClick('F2F', 'https://f2f.com/s/QXmPjB');
```

## Important Notes

### Data Persistence on Vercel
- The `/data` folder will be created automatically on Vercel
- Click data persists between deployments
- For high traffic, consider migrating to a database (see recommendations below)

### Security Recommendations
The analytics endpoint is currently public. For production:

1. **Protect the analytics dashboard** - Add authentication
2. **Rate limit the tracking endpoint** - Prevent abuse
3. **Add CORS headers** - If you need to call from external domains

### Upgrading to a Database (Optional)
For high traffic or better reliability, consider:
- **Vercel Postgres** - Built-in database
- **MongoDB Atlas** - NoSQL option
- **PlanetScale** - MySQL-compatible
- **Supabase** - PostgreSQL with real-time features

## Clean Up Local Test Data

Before or after deployment, you can clean up test data:

```bash
# Remove test clicks (optional)
rm -rf data/
```

The folder will be recreated automatically on first use.

## Monitoring Your Clicks

Access your analytics anytime at:
- **Dashboard:** `https://your-domain.vercel.app/analytics`
- **API:** `https://your-domain.vercel.app/api/analytics`

The dashboard updates in real-time with a refresh button!

## Questions?

Refer to `TRACKING.md` for detailed API documentation and integration examples.

