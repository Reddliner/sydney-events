import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User.js'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        { email: profile.emails[0].value },
        { upsert: true, new: true }
      )
      done(null, user)
    }
  )
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
)
