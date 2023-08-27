const Sentry = require('@sentry/node'),
   sentry_dsn = process.env.SENTRY_DSN;

Sentry.init({ dsn: sentry_dsn });
/**
 * Returns middleware for catching internal server errors
 */

let serverError = (err, req, res, next) => {
   console.error(err);
   Sentry.captureException(err);
   res.status(500).render('index/500', {
      fortune: require('../utils/fortune').getFortune(),
      title: 'Server Error'
   });
};

module.exports = serverError;
