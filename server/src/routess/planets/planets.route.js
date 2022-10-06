const express = require('express');

const planetsRouter = express.Router();
const { httpAllNewPlanets } = require('./planets.controller');


planetsRouter.get('/', httpAllNewPlanets)


module.exports = planetsRouter