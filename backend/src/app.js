import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from './auth/passport.js'

import eventsRoutes from './routes/events.routes.js'
import authRoutes from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true
  })
)

app.use(express.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false // Railway uses HTTPS but Node sees HTTP
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Sydney Events API running'
  })
})

// Public
app.use('/events', eventsRoutes)

app.use('/dashboard', dashboardRoutes)

// Auth
app.use('/auth', authRoutes)

export default app
