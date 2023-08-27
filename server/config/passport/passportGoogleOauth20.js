let GoogleStrategy = require('passport-google-oauth20').Strategy,
   mongoose = require('mongoose'),
   GoogleUser = require('../../models/GoogleUser');

module.exports = (passport) => {
   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/auth/callback'
         },
         async (accessToken, refreshToken, profile, done) =>
            console.log(profile)
      )
   );
   passport.serializeUser((user, done) => done(null, user.id));
   passport.deserializeUser((id, done) =>
      GoogleUser.findById(id, (err, user) => done(err, user))
   );
};
