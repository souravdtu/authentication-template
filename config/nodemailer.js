const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./env');

let transporter = nodemailer.createTransport(env.smtp);

module.exports = {
    transporter: transporter,
}