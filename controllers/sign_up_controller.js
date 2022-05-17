const User = require('../models/user');
const CryptoJS = require('crypto-js');

module.exports.email = function(req,res){
        return res.render('sign_up_email');
};

module.exports.google = function(req,res){
        return res.render('sign_up_email');
};

module.exports.data = function(req,res){
        console.log(req.query)
        if(req.query.password != req.query.confirm_password){
                req.flash('error','password unmatch');
                res.redirect('/sign-up/email');
                return;    
        }
        var ciphertext = CryptoJS.AES.encrypt(req.query.password, 'sourav').toString();
        User.create({
                email: req.query.email,
                password: ciphertext
        },function(err,newUser){
                if(err){
                    console.log('error in creating a contact',err);
                    return;
                }
                console.log('########',newUser);
                req.flash('success','registred successfully');
                res.redirect('/');
                return;
        });
};