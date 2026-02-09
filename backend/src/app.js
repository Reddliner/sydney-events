import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'

// IMPORTANT: this file registers GoogleStrategy
import './config/passport.js'

import eventsRoutes from './routes/events.routes.js'
import authRoutes from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()

/**
 * CORS — must be explicit for OAuth + cookies
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)

app.use(express.json())

/**
 * Session — Railway-safe config
 */
app.use(
  session({
    name: 'sydney-events.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,        // required for Railway
      sameSite: 'none'     // required for cross-site OAuth
    }
  })
)

/**
 * Passport — order matters
 */
app.use(passport.initialize())
app.use(passport.session())

/**
 * Health check
 */
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Sydney Events API running'
  })
})

/**
 * Routes
 */
app.use('/events', eventsRoutes)
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

export default app
