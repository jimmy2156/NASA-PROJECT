const { allPlanets } = require('../../model/planets.model')


async function httpAllNewPlanets(req,res) {
    return res.status(200).json(await allPlanets())
}






module.exports = { httpAllNewPlanets }