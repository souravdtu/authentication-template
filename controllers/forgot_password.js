const nodemailer = require('../config/nodemailer')

module.exports.forgot = function(req,res){
    return res.render('forgot_password');
};
module.exports.link = async function(req,res){
    let info = await nodemailer.transporter.sendMail({
        from: '<sourav.metoit@gmail.com>',
        to: req.query.email,
        subject: "Reset Password",
        text: `http://localhost:8000/sign-in/via-mail/reset-password/?email=${req.query.email}`
    });
    return res.redirect('/');
};