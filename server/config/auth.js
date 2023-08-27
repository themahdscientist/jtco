module.exports = {
   ensureAuth: (req, res, next) => {
      if (req.isAuthenticated()) return next();
      req.flash('error', 'Please log in or register to continue.');
      res.redirect('/admin');
   },
   ensureGuest: (req, res, next) => {
      if (req.isAuthenticated()) {
         res.redirect('/admin/dashboard');
      } else {
         return next();
      }
   }
};
