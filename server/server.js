const http = require('http')

const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: './.env'});
const app = require('./src/app')
const { loadPlanetData } = require('./src/model/planets.model')
const {loadLaunchData} = require('./src/model/launches.model')
const {loadingData} = require('./src/services/mongo')

const PORT = process.env.PORT;


const server = http.createServer(app)

async function start() {
await loadingData()
await loadPlanetData()
await loadLaunchData()
server.listen(PORT, () => {
     console.log(`Listening at port ${PORT}...`)
 })}

start()
// const fs = require('fs')
// const path = require('path')
// const https = require('https')
// const express = require('express')
// const app = express()
// const helmet = require('helmet')
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const cookieSession = require('cookie-session')

// const PORT = 3000
// const config = {
//     CLIENT_ID: process.env.CLIENT_ID,
//     CLIENT_SECRET: process.env.CLIENT_SECRET,
//     COOKIE_KEY_1: process.env.COOKIE_KEY_1,
//     COOKIE_KEY_2: process.env.COOKIE_KEY_2
// }
// const AUTH_OPTIONS = {
//     callbackURL: '/auth/google/callback',
//     clientID: config.CLIENT_ID,
//     clientSecret: config.CLIENT_SECRET
// }
// function verifyCallback(accessToken, refreshToken, profile, done) {
//     console.log('Google profile', profile);
//     done(null, profile)
// }
// passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback))

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })
// passport.deserializeUser((id, done) => {
//     done(null, id)
// })

// app.use(helmet())
// app.use(cookieSession({
//     name: 'session',
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]

// }))
// app.use(passport.initialize())  
// app.use(passport.session())


// function checkLoggedIn(req,res,next) {
//     const isLoggedIn = req.isAuthenticated() && req.user;
//     if (!isLoggedIn) {
//         return res.status(401).json({
//             error: 'You must log in!'
//         })
//     }
//     next()
// }
// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['email'],
// }))
// app.get('/auth/google/callback', passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect: '/',
//     session: true
// }), (req,res) => {
//     console.log('google called us back')
// })
// app.get('/auth/logout', (req,res) => {
//     req.logout()
//     return res.redirect('/')
// })
// app.get('/secret', checkLoggedIn,  (req,res) => {
//     return res.send("Your secret password is 42")
// })
// app.get('/failure', (req,res) => {
//     return res.send('Failed to log in!')
// })
// app.get('/', (req, res) => {
//     return res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });
  
// https.createServer(
//     {key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'), }, app
// ).listen(PORT, console.log("its listening at 3000....."))
