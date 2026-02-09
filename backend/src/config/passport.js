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
      try {
        if (!profile || !profile.id) {
          return done(new Error('Invalid Google profile'), null)
        }

        const email = profile.emails?.[0]?.value
        if (!email) {
          return done(new Error('Google account has no email'), null)
        }

        const user = await User.findOneAndUpdate(
          { googleId: profile.id },
          {
            googleId: profile.id,
            email
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
          }
        )

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

// Serialize only the user ID into the session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserialize user safely
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})
