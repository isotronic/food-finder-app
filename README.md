# Food Finder App

This is a web app that helps users find nearby restaurants based on their preferences and location.

## Features

- Users can search for restaurants by cuisine, price range, rating, or location
- Users can view restaurant details.(in developement)
- Users can save their favorite restaurants and view them later.(planned)

## Technologies

This project is built with TypeScript, React, and Firebase.

## Installation

To run this project locally, you need to have Node.js and npm installed on your machine.

1. Clone this repository: `git clone https://github.com/isotronic/food-finder-app.git`
2. Navigate to the project folder: `cd food-finder-app`
3. Install the dependencies: `yarn`
4. Create a `.env.local` file with the following variables:
   `VITE_PLACES_API_KEY, VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID, VITE_FIREBASE_MEASUREMENT_ID` (Create a Firebase app to get the Firebase details and search for Google Maps API to get your Places API key)
5. Start the development server: `yarn dev`
6. Open your browser and go to `http://localhost:5173`
