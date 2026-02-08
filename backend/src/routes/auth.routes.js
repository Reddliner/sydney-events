import express from 'express'
import passport from 'passport'

const router = express.Router()

// 👇 QUICK DIAGNOSTIC (TEMP)
router.get(
  '/google',
  (req, res, next) => {
    console.log('/auth/google route hit')
    next()
  },
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL + '/#/dashboard')
  }
)

export default router
