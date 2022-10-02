const { planets } = require('../../model/planets.model')


function allNewPlanets(req,res) {
    return res.status(200).json(planets)
}






module.exports = { allNewPlanets }