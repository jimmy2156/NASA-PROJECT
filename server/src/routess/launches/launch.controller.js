const { planetLaunches, planetPost1,  existsLaunchWithId, abortLaunchById} = require('../../model/launches.model');
const {getPagination} = require('../../services/query')


async function httpalllaunchingPlanet(req,res) {
    const {skip, limit} = getPagination(req.query)
    const launches = await planetLaunches(skip, limit)
    return res.status(200).json(launches)
};
async function httpPostLaunchingPlanet(req,res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return res.status(400).json({msg: "missing arguments"})
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({error: 'Invalid error date'})
    }
    await planetPost1(launch)
    res.status(201).json(launch)

}

async function httpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);
    const existLaunch = await existsLaunchWithId(launchId);
    if (!existLaunch) {
        return res.status(404).json({
            error: "Id does not exist"
        })
    }
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        res.status(400).json({
            error: "launch not aborted"
        })
    }
    return res.status(200).json({
        ok: true
    })


}



module.exports = { httpalllaunchingPlanet, httpPostLaunchingPlanet, httpAbortLaunch}