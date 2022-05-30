
const development = {
    name: 'development',
    asset_path: 'assets',
    session_cookie_key: 'blahsomething',
    db: 'authentication',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GOOGLE_AUTH_USER,
            pass: process.env.GOOGLE_AUTH_PASS
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
}

const production = {
    name: 'production',
    asset_path: process.env.ASSET,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GOOGLE_AUTH_USER,
            pass: process.env.GOOGLE_AUTH_PASS
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback"
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);