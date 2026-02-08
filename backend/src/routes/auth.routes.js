import express from 'express'
import passport from '../auth/passport.js'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/#/dashboard`)
  }
)

router.get('/success', (req, res) => {
  res.json({
    loggedIn: true,
    user: req.user
  })
})

export default router
