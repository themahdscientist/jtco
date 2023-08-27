const LocalStrategy = require('passport-local').Strategy,
   mongoose = require('mongoose'),
   bcrypt = require('bcrypt'),
   User = require('../../models/LocalUser'),
   msg = 'Incorrect email or password.';

module.exports = (passport) => {
   passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
         // Find the user
         User.findOne({ email: email })
            .then((user) => {
               if (!user)
                  return done(null, false, {
                     message: msg
                  });
               // Match Password
               bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (err) throw err;
                  if (isMatch) {
                     return done(null, user);
                  } else {
                     return done(null, false, {
                        message: msg
                     });
                  }
               });
            })
            .catch(() => console.error);
      })
   );
   passport.serializeUser((user, done) => {
      done(null, user.id);
   });
   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
   });
};
