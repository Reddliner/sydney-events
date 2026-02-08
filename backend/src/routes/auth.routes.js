import express from 'express'
import passport from 'passport'

const router = express.Router()

// 🚀 START GOOGLE LOGIN
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

// 🔁 GOOGLE CALLBACK
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/auth/success')
  }
)

router.get('/success', (req, res) => {
  res.json({
    loggedIn: true,
    user: req.user
  })
})

export default router
