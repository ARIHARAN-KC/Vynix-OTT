export const oauthConfig = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 
      `http://localhost:${process.env.PORT || 5000}/api/v1/account/auth/google/callback`,
  },
};