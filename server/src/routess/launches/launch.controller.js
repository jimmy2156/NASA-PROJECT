const { planetLaunches, planetPost1,  existsLaunchWithId, abortLaunchById} = require('../../model/launches.model');


async function httpalllaunchingPlanet(req,res) {
    return res.status(200).json(await planetLaunches())
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

function httpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Id does not exist"
        })
    }
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted)


}



module.exports = { httpalllaunchingPlanet, httpPostLaunchingPlanet, httpAbortLaunch}