/**
 * Returns middleware for flash messages.
 * It transfers an existing msg to res.locals if any;
 * @description if there's a flash message, transfer it to the context, then clear it
 */

module.exports = (req, res, next) => {
   res.locals.error = req.flash('error');
   res.locals.warning_msg = req.flash('warning_msg');
   res.locals.success_msg = req.flash('success_msg');
   next();
};
