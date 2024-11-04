# New App

## Overview

New App is a web application that allows users to search for nearby apartments with their current specials and provides a call to action to contact you for more information or assistance.

## User Journey

1. **Sign In**

   - Upon visiting the app, users are presented with a sign-in page.
   - Users can sign in using various methods: email (magic link), Google, Facebook, or Apple.
   - There is a "Sign in with ZAPT" heading above the authentication component.
   - Users can learn more about ZAPT by following a link to [ZAPT's marketing site](https://www.zapt.ai).

2. **Search for Apartments**

   - After signing in, users are taken to the main page.
   - Users can enter a location (e.g., city, zip code) into a search form or choose to use their current location.
   - Users click the "Search" button to find apartments nearby.

3. **View Apartment Listings**

   - The app displays a list of apartments in the specified area.
   - Each apartment listing shows:
     - Apartment name
     - Address
     - Current specials or promotions
     - An image of the apartment (if available)
   - The listings are presented in a user-friendly grid or list format.

4. **Contact Action**

   - Each apartment listing includes a "Contact Me" button.
   - When users click the "Contact Me" button, a prompt or form appears allowing them to send a message or request more information.
   - Alternatively, the button can initiate an email to you with the apartment details attached.

## External APIs Used

- **Apartment Listings API**

  - The app uses an external API to fetch apartment listings based on the user's input location.
  - The API requires an API key, which is stored securely on the server.
  - The specific API used is a placeholder; you will need to replace `https://api.example.com/apartments` with a real API endpoint.

## Environment Variables

The following environment variables are required for the app to function correctly:

- `APARTMENTS_API_KEY`: API key for accessing the apartment listings API.
- `VITE_PUBLIC_SENTRY_DSN`: DSN for Sentry error tracking.
- `VITE_PUBLIC_APP_ENV`: App environment (e.g., production, development).
- `VITE_PUBLIC_APP_ID`: App ID for integrating with ZAPT.

Please ensure these variables are set in your environment or in an `.env` file before running the app.

## Note

- The app requires user authentication to access the apartment search functionality.
- All API calls and sensitive operations are handled securely to protect user data.
- The app is responsive and works across different screen sizes and devices.