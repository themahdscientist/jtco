let passport = require('passport');

let auth = (req, res, next) => {
   passport.authenticate('google', { scope: ['profile'] });
   next();
};
let authCallback = (req, res, next) => {
   passport.authenticate('google', { failureRedirect: '/' });
   next();
};

module.exports = { auth, authCallback };
