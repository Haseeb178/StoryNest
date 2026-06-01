# StoryNest Frontend

A frontend-only StoryNest website using HTML, CSS, and vanilla JavaScript.

## Features

- Dynamic story data stored in Firebase Firestore
- Secure admin login with a dedicated `login.html` flow
- Story view analytics tracked in Firestore
- AI-powered story draft generator in the admin panel
- Homepage with featured, animals, facts, and trending sections
- Search and category browsing
- Story page loaded via `story.html?id=...`
- Admin panel with add, edit, delete functionality
- Modern responsive UI with a dashboard-style admin experience

## Files

- `index.html` - homepage
- `story.html` - story detail page
- `admin.html` - admin CRUD panel
- `login.html` - secure admin login page
- `css/style.css` - shared styling
- `js/firebase.js` - Firebase initialization wrapper
- `js/auth.js` - admin authentication and session guard
- `js/dataService.js` - hybrid Firestore/localStorage/seed data layer
- `js/aiStoryGenerator.js` - mock AI story generator
- `js/index.js` - homepage logic
- `js/story.js` - story page logic
- `js/admin.js` - admin panel logic and AI story generator
- `data/seedStories.js` - default sample stories fallback
- `data/stories.json` - legacy story dataset fallback

## Run locally

Open `index.html` in a browser, or use a simple HTTP server for best compatibility.

Example with Python:

```bash
cd StoryNest-Frontend
python -m http.server 8000
```

Then open `http://localhost:8000`.

> Note: Update `js/firebase.js` with your Firebase project credentials before using Firestore.
