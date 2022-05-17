const passport = require('passport')
// importing support for passport library
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const CryptoJS = require('crypto-js');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email: email}, function(err,user){
            if(err){
                console.log('Error in finding user --> Passport');
                req.flash('error',err);
                return done(err);
            }
            // console.log(user);
            var bytes  = CryptoJS.AES.decrypt(user.password, 'sourav');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            if(!user || originalText != password){
                console.log('Invalid Username/Password');
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            // console.log('uiuiui',user)
            return done(null,user);
        });
    }
));

//SERILAIZING THE USER TO DECIDE WHICH KEY IS TO BE KEPT IN COOKIES
passport.serializeUser(function(user,done){
    // console.log('serial',user)
    done(null,user.id);
})

//DESERILAIZING THE USER FROM THE KEY IN THE COOKIE
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    })
})


// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in 
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the loclas for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;