
const User = require('../models/user');
const CryptoJS = require('crypto-js');


module.exports.in = function(req,res){
        User.find({email: req.query.email},function(err,user_found){
                if(err){
                    console.log('error in creating a contact',err);
                    return;
                }
                // console.log('########',user_found);
                
                var bytes  = CryptoJS.AES.decrypt(user_found[0].password, 'sourav');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                if(req.query.password==originalText){
                        req.flash('success', 'Signed In');
                        res.render('sign_in',{
                                email: req.query.email
                        });
                        return;
                }
                req.flash('error','Invalid Credentials');
                res.redirect('/');
                return;
        });
};

module.exports.reset_password = function(req,res){
        return res.render('reset_password',{
                email: req.query.email
        });
};

module.exports.reset_password_data = async function(req,res){
        if(req.query.password!=req.query.confirm_password){
                return res.redirect('back')
        }
        const ciphertext = CryptoJS.AES.encrypt(req.query.password, 'sourav').toString();
        await User.findOneAndUpdate({email: req.params.email},{
                $set: {
                        password: ciphertext
                }
        })
        return res.redirect('/');
};