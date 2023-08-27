const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
   name: String,
   slug: String,
   category: String,
   sku: String,
   description: String,
   location: {
      search: String,
      coordinates: {
         lat: Number,
         lng: Number,
      },
   },
   price: Number,
   tags: [String],
   inSeason: Boolean,
   available: Boolean,
   requiresWaiver: Boolean,
   maximumGuests: Number,
   notes: String,
   packageSold: Number,
});

module.exports = mongoose.model("Course", courseSchema);
