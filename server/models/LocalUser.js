let mongoose = require('mongoose');

const localUserSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: new Date()
   }
});

module.exports = mongoose.model('LocalUser', localUserSchema);
