# Click Tracking System

## Overview
This landing page now includes a click tracking system that logs every CTA button click with detailed analytics.

## Features
- 🎯 Automatic click tracking on all CTA buttons
- 📊 Analytics dashboard at `/analytics`
- 🔌 REST API for external integrations
- 📈 Real-time statistics

## API Endpoints

### 1. Track a Click
**POST** `/api/track`

Track a button click event.

**Request Body:**
```json
{
  "buttonLabel": "F2F",
  "buttonHref": "https://f2f.com/s/QXmPjB"
}
```

**Response:**
```json
{
  "success": true,
  "clickId": "1234567890-abc123def"
}
```

**Example cURL:**
```bash
curl -X POST https://your-domain.vercel.app/api/track \
  -H "Content-Type: application/json" \
  -d '{"buttonLabel":"F2F","buttonHref":"https://f2f.com/s/QXmPjB"}'
```

### 2. Get Analytics
**GET** `/api/analytics`

Retrieve click statistics.

**Query Parameters:**
- `startDate` (optional): Filter from this date (ISO 8601 format)
- `endDate` (optional): Filter to this date (ISO 8601 format)

**Response:**
```json
{
  "totalClicks": 42,
  "clicksByButton": {
    "F2F": 15,
    "OnlyFans": 20,
    "WhatsApp me": 5,
    "Telegram": 2
  },
  "recentClicks": [
    {
      "id": "1234567890-abc123def",
      "buttonLabel": "F2F",
      "buttonHref": "https://f2f.com/s/QXmPjB",
      "timestamp": "2025-12-08T10:30:00.000Z",
      "userAgent": "Mozilla/5.0...",
      "referer": "https://twitter.com/..."
    }
  ]
}
```

**Example cURL:**
```bash
# Get all analytics
curl https://your-domain.vercel.app/api/analytics

# Get analytics for a specific date range
curl "https://your-domain.vercel.app/api/analytics?startDate=2025-12-01&endDate=2025-12-08"
```

## Twitter Integration Example

You can track clicks from your Twitter interface by making a POST request to the tracking API:

```javascript
// Example: Track a click from Twitter
async function trackTwitterClick(buttonLabel, buttonHref) {
  try {
    const response = await fetch('https://your-domain.vercel.app/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        buttonLabel,
        buttonHref,
      }),
    });
    
    const data = await response.json();
    console.log('Click tracked:', data.clickId);
  } catch (error) {
    console.error('Failed to track click:', error);
  }
}

// Usage
trackTwitterClick('F2F', 'https://f2f.com/s/QXmPjB');
```

## Analytics Dashboard

Visit `/analytics` on your deployed site to view:
- Total click count
- Clicks per button
- Recent click history with timestamps
- User agent information

## Data Storage

Click data is stored in `/data/clicks.json` on the server. This file:
- Is automatically created on first use
- Is excluded from git (added to .gitignore)
- Will persist on Vercel with writable filesystem

**Note:** For production with high traffic, consider migrating to a database (PostgreSQL, MongoDB, etc.)

## Security Considerations

The analytics endpoint is currently public. For production, consider:
- Adding authentication to `/api/analytics`
- Rate limiting on `/api/track`
- CORS configuration if needed for external calls

## Deployment Notes

When deploying to Vercel:
1. The `/data` directory will be created automatically
2. Click tracking will work immediately
3. Access analytics at `https://your-domain.vercel.app/analytics`

## Testing Locally

```bash
# Start dev server
pnpm dev

# Visit the landing page
open http://localhost:3000

# Click some buttons, then view analytics
open http://localhost:3000/analytics

# Test API directly
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{"buttonLabel":"Test","buttonHref":"https://example.com"}'

curl http://localhost:3000/api/analytics
```

