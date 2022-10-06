const express = require('express');
const launchRouter = express.Router()
const {httpalllaunchingPlanet, httpPostLaunchingPlanet, httpAbortLaunch} = require('./launch.controller');


launchRouter.get('/', httpalllaunchingPlanet);
launchRouter.post('/', httpPostLaunchingPlanet)
launchRouter.delete('/:id', httpAbortLaunch)


module.exports = launchRouter