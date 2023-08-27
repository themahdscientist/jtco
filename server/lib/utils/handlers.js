let fortune = require('./fortune');

/**
 * Utility to handle all the app's routes
 * @returns void
 * @author Ifeanyichukwu Akudinobi
 */
module.exports = {
   /**
    * Route Handlers
    * @param {IncomingClientRequest} req the request object
    * @param {OutgoingServerResponse} res the response object
    */
   index: (req, res) => {
      res.render('index/home', { title: 'Home', ip: req.ip });
   },
   about: (req, res) => {
      res.render('index/about', {
         fortune: fortune.getFortune,
         title: 'The Developers </>'
      });
   },
   company: (req, res) => {
      res.render('index/company', { title: 'The Company' });
   },
   productsAndServices: (req, res) => {
      res.render('index/products-and-services', { title: 'Our Products' });
   },
   adminHome: (req, res) => {
      res.render('admin/home', { layout: 'admin', title: 'Admin Panel' });
   },
   adminDashboard: (req, res) => {
      res.render('admin/dashboard', {
         title: 'Dashboard',
         name: req.user.name,
         email: req.user.email,
         date: req.user.date
      });
   },
   adminLogout: (req, res) => {
      req.logout((err) => { if (err) throw err; });
      req.flash('success_msg', 'You logged out successfully.');
      res.redirect('/admin');
   },
   /**
    * Controller Handlers
    */
   registerController: require('../../controllers/register.controller'),
   loginController: require('../../controllers/login.controller'),
   googleLoginController: require('../../controllers/googleLogin.controller')
};
