let cache = {},
   fs = require('fs'),
   { promisify } = require('util'),
   existsAsync = promisify(fs.exists);

/**
 * 
 * @param {IncomingClientRequest} req the request object
 * @param {OutgoingServerResponse} res the response object
 * @param {Function} next the next function
 * @returns the view to be rendered
 * @description automatically renders views if available in the cache
 */
module.exports = async (req, res, next) => {
   let path = req.path.toLowerCase();
   // If it's in the cache, render the view
   if (cache[path]) return res.render(`static/${cache[path]}`);
   try {
      // If it's not in the cache, render a matching .hbs file
      if (await existsAsync(`${__dirname}/../../views/static${path}.hbs`)) {
         cache[path] = path.replace(/^\//, '');
         return res.render(`static/${cache[path]}`);
      } else {
         throw new Error(`Path ${path} has no renderable views`);
      }
   } catch (err) {
      // No views found? Pass to the 404 handler
      cache = {};
      return next();
   }
};
