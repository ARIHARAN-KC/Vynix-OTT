import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { oauthConfig } from './oauth.js';
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/index.js';

const { User } = db;

// JWT generator
const generateToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

// Serialize user
passport.serializeUser((user: any, done) => done(null, user.id));

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error as Error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: oauthConfig.google.clientID,
  clientSecret: oauthConfig.google.clientSecret,
  callbackURL: oauthConfig.google.callbackURL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(new Error("No email found in Google profile"), undefined);
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        userName: profile.displayName,
        email,
        password: null, // OAuth user
        role: 'user',
        picture: profile.photos?.[0]?.value,
        createdBy: 'oauth-google',
        updatedBy: 'oauth-google',
      });
    } else {
      // Update picture if missing
      if (!user.picture && profile.photos?.[0]?.value) {
        await user.update({ 
          picture: profile.photos[0].value,
          updatedBy: 'oauth-google' 
        });
      }
    }

    return done(null, user);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error as Error, undefined);
  }
}));

export default passport;
