import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { location } = req.body;
    const apiKey = process.env.APARTMENTS_API_KEY;
    const apiUrl = `https://api.example.com/apartments?location=${encodeURIComponent(location)}&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      // Assuming the API returns an array of apartments in data.apartments
      res.status(200).json({ apartments: data.apartments });
    } else {
      console.error('Error fetching apartments:', response.statusText);
      res.status(500).json({ error: 'Error fetching apartments' });
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}