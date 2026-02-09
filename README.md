# Sydney Events Platform

A full-stack MERN application that aggregates and manages events in Sydney. The platform includes a public-facing events listing and an admin dashboard secured with Google OAuth for managing events.

---

## Live Demo

- **Frontend:** https://sydney-events-production-f51c.up.railway.app  
- **Backend API:** https://sydney-events-production-36b3.up.railway.app

> Admin access is protected via Google OAuth.

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Google OAuth 2.0)

### Infrastructure
- Railway (Frontend & Backend)
- MongoDB Atlas
- Google Cloud Console (OAuth)

---

## Features

### Public
- View curated Sydney events
- Clean, responsive UI

### Admin
- Google OAuth authentication
- Secure admin dashboard
- Event management endpoints

### System
- Environment-based configuration
- Production-ready deployment
- Session-based authentication

---

## Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── passport.js
│   │   ├── models/
│   │   │   ├── Event.js
│   │   │   └── Lead.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── events.routes.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardTable.jsx  // placeholder
│   │   │   └── EventModal.jsx      // placeholder
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Authentication Flow (Google OAuth)

1. Admin clicks **Sign in with Google** on frontend
2. Frontend redirects to backend `/auth/google`
3. Google OAuth consent screen
4. Callback handled at `/auth/google/callback`
5. User session created and redirected to dashboard

---

## Environment Variables

### Backend

```
PORT=5000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BACKEND_URL=https://your-backend-domain
FRONTEND_URL=https://your-frontend-domain
```

### Frontend

```
VITE_BACKEND_URL=https://your-backend-domain
```

> Vite environment variables are baked at build time redeploy frontend after changes.

---

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Deployment Notes

- Frontend and backend are deployed as **separate Railway services**
- HTTPS enforced automatically by Railway
- Google OAuth redirect URIs must match deployed backend URL

---

## Future Enhancements

- Admin event approval UI
- Event detail modal
- Role-based access control
- Analytics dashboard

---

## Notes

Some UI components are intentionally scaffolded as placeholders for future admin features. This allows the project to remain flexible while keeping the MVP lean and production-ready.

---

##  Author

Built with care as a full-stack MERN project.