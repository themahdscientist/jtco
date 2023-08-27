const mongoose = require('mongoose'), mongodbUrl = process.env.MONGODB_LOCAL;

(async () => {
   try {
      if (!mongodbUrl) throw new Error('connection URL required');
      await mongoose.connect(mongodbUrl).then(() => console.log('MongoDB connected'));
   } catch (err) {
      console.error(`MongoDB: ${err.message}`);
      await mongoose.disconnect();
      console.error(`Restarting MongoDB`);
      await mongoose.connect(mongodbUrl).then(() => console.log('MongoDB connected'));
   }
})();
