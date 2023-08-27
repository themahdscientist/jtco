require('dotenv').config({ path: './config/.env' }), require('./config/db');
let express = require('express'),
   https = require('https'),
   fs = require('fs'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
   exphbs = require('express-handlebars').engine,
   passport = require('passport'),
   cookieParser = require('cookie-parser'),
   flash = require('connect-flash'),
   session = require('express-session'),
   MongoStore = require('connect-mongo')(session),
   cors = require('cors'),
   compression = require('compression'),
   helmet = require('helmet'),
   morgan = require('morgan'),
   autoViews = require('./lib/middleware/auto-views');
errorHandler = require('./lib/middleware/error-handler'),
   flashMsg = require('./lib/middleware/flash'),
   app = express();

const port = process.env.PORT,
   cookie_secret = process.env.COOKIE_SECRET;

// Logging Component
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Configurations
app.engine(
   'hbs',
   exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: {
         section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
         }
      }
   })
);
app.set('view engine', 'hbs');
app.set('views', './views/');
app.set('view cache', true);
app.enable('trust proxy');
// Middlewares
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookie_secret));
app.use(
   session({
      secret: cookie_secret,
      name: 'jt.session',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
         mongooseConnection: mongoose.connection
      })
   })
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passportLocal')(passport),
   require('./config/passport/passportGoogleOauth20')(passport);
app.use(flash());
app.use(flashMsg);

// * Route Handlers
app.use('/', require('./routes/index_dir'));
app.use('/admin', require('./routes/admin_dir/admin'));
// Automatic Viewing
app.use(autoViews);
// Not Found - 404
app.use((req, res) => {
   res.status(404).render('index/404', {
      fortune: require('./lib/utils/fortune').getFortune(),
      title: 'Not Found'
   });
});
// Server Error - 500
app.use(errorHandler);

// Start the HTTPS server
let options = {
   key: fs.readFileSync('./config/ssl/server.pem'),
   cert: fs.readFileSync('./config/ssl/server.crt')
}
https.createServer(options, app).listen(port);