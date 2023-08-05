/* ---------- IMPORTING PACKAGES ---------- */
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();  
const port = 8000;

const db = require("./config/mongoose");
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const flashMessages = require('./config/flashMessages');

const MongoStore = require('connect-mongo');



/* Set up session handling */ 
app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create(
        {
            mongoUrl:"mongodb+srv://himadrinayak:12345@cluster0.h7n86ah.mongodb.net/omdb-api?retryWrites=true&w=majority",
            autoRemover : 'disabled'
        },
        function(err){
            console.log("Error in the mongo-store");
        }
    ),
}));

/* Middleware for flash message*/
app.use(flash());
app.use(flashMessages.setFlash);

/* Middleware to check user authentication */
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
});

/* Middleware for body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Accessing files from static folder */
const staticFolderPath = path.join(__dirname, 'assets');
app.use(express.static(staticFolderPath));

/* Setting up views engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

/* Setting up routes */
app.use('/', require('./route'));

/* Directing the app to the given port */
app.listen(port, function() {
    console.log("Server is up and running on port ", port);
});
