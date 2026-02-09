import express from 'express'
import passport from 'passport'

const router = express.Router()

// Start Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
)

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: true
  }),
  (req, res) => {
    // Successful login → redirect to admin dashboard
    res.redirect(`${process.env.FRONTEND_URL}/#/dashboard`)
  }
)

// Optional failure route (helps debugging)
router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Google authentication failed' })
})

export default router
