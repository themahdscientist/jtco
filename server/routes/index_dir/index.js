let express = require('express'),
   router = express.Router(), routes = require('../../lib/utils/handlers')

// index
router.get('^/$|/index(.hbs)?', routes.index);
// about
router.get('/about(.hbs)?', routes.about);
// company
router.get('/company(.hbs)?', routes.company);
// products and services
router.get('/products-and-services(.hbs)?', routes.productsAndServices);

module.exports = router;
