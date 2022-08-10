const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middileware');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));
// static files
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));


// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// parse cookie and form data
app.use(express.urlencoded());
app.use(cookieParser());

// use layouts
app.use(expressLayouts);

// set up views
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    Cookie: {
       maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
      },
      function(err){
        console.log(err || 'connect-mongodb set up is ok');
    })
  

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes/index'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is up! And running on port: ${port}`);
});