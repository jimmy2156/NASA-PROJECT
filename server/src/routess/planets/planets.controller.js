const { allPlanets } = require('../../model/planets.model')


function httpAllNewPlanets(req,res) {
    return res.status(200).json(allPlanets())
}






module.exports = { httpAllNewPlanets }