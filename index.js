// Express required
const express = require('express');
const app = express();
const port = 8000;
const env = require('./config/env');
// libraries required
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

// config required
const db = require('./config/mongoose');
const passportLocal = require('./config/passport-local-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');
const customMware = require('./config/custom-mw');

// require('dotenv').config();

// setting view engine
app.set('view engine', 'ejs')
app.set('views', './views');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use(session({ 
        cookie: { maxAge: 50000 },
        secret: env.session_cookie_key,
        resave: false, 
        saveUninitialized: false,
        store: MongoStore.create({
                mongoUrl: 'mongodb://localhost/authentication-session',
                autoRemove: 'disabled'},
            function(err){console.log(err || ' connect-mongodb setup ok');}
        )
}));
app.use(flash());
app.use(customMware.setFlash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use((req,res,next)=>{
    console.log(req.session);
    // console.log(req.user);
    next();
});
app.use('/', require('./routes/index'));


// listen app
app.listen(port, function(err){
    if(err){
        console.log(`Error in listening to server on port ${port}`);
    }
    console.log(`server is running on port: ${port}`);
});