const express = require('express');

const planetsRouter = express.Router();
const { allNewPlanets } = require('./planets.controller');


planetsRouter.get('/planets', allNewPlanets)


module.exports = planetsRouter