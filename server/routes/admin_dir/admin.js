let express = require('express'),
   router = express.Router(),
   routes = require('../../lib/utils/handlers'),
   { ensureAuth, ensureGuest } = require('../../config/auth');

// Home & Login
router.route('/')
   .get(ensureGuest, routes.adminHome)
   .post(routes.loginController);
// Register
router.post('/register', routes.registerController);
// Dashboard
router.get('/dashboard', ensureAuth, routes.adminDashboard);
// Logout
router.get('/logout', routes.adminLogout);
// Google Auth
router.get('/auth', routes.googleLoginController.auth);
// Google Auth Callback
router.get(
   '/auth/callback',
   routes.googleLoginController.authCallback,
   routes.adminDashboard
);

module.exports = router;
