let passport = require('passport');

module.exports = (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/admin',
      failureFlash: true
   })(req, res, next);
};
