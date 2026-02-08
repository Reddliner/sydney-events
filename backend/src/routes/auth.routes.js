import express from 'express'
import passport from 'passport'

const router = express.Router()

// Start Google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    // Successful login
    res.redirect('/auth/success')
  }
)

// Simple success endpoint
router.get('/success', (req, res) => {
  res.json({
    loggedIn: true,
    user: req.user
  })
})

// Logout
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true })
  })
})

export default router
