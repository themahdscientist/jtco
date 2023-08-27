let bcrypt = require('bcrypt'),
   User = require('../models/LocalUser');

module.exports = (req, res) => {
   const { name, email, password, password2 } = req.body;
   let errors = [];

   // Check required fields
   if (!name || !email || !password || !password2)
      errors.push({ msg: 'Please fill in all fields' });

   // Check if passwords match
   if (password !== password2) errors.push({ msg: 'Passwords do not match' });

   // Check passwords length
   if (password.length < 6)
      errors.push({
         msg: 'Passwords should be at least 6 characters'
      });

   if (errors.length > 0) {
      req.flash('warning_msg', errors);
      res.redirect('/admin');
   } else {
      User.findOne({ email: email }).then((user) => {
         if (user) {
            errors.push({
               msg: 'Email already exists'
            });
            req.flash('warning_msg', errors);
            res.redirect('/admin');
         } else {
            const newUser = new User({
               name,
               email,
               password
            });
            // Hash Password
            bcrypt.hash(newUser.password, 10, (err, hash) => {
               if (err) throw err;
               // Set password to hashed
               newUser.password = hash;
               newUser
                  .save()
                  .then((user) => {
                     req.flash(
                        'success_msg',
                        'Registration Success! Please Login.'
                     );
                     res.redirect('/admin');
                  })
                  .catch(console.err);
            });
         }
      });
   }
};
