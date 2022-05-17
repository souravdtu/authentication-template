const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// const env = require('./environment');



// tell passport to ue a new strategy for google login
passport.use(new googleStrategy(
    function(accessToken, refreshToken, profile,done){
        //find a user
        // console.log(profile)
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('err in google strategy-passport',err);return;}
            if(user){
                //if found  user, set this user as req.user
                return done(null,user);
            }else{
                //if not found , create the user and set it as req.user
                User.create({
                    email: profile.emails[0].value,
                    password: "U2FsdGVkX1+68+AMxU+eSpJBo/Tld+rbSAklzQfjKzo="
                    // password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user google strategy-passport', err); return;}
                    return done(null, user);
                });
            }
        });
    }
));


module.exports = passport;