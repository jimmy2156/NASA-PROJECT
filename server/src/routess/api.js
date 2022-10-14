const express = require('express')
const api = express.Router()
const planetsRouter = require('./planets/planets.route');
const launchRouter = require('./launches/launch.route')





api.use('/planets',planetsRouter)
api.use('/launches',launchRouter)


module.exports = api