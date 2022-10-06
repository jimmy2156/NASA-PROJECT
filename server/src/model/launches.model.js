const launches = new Map();
let newFlightNumber = 100
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId)
}

function planetLaunches() {
    return  Array.from(launches.values())
}
function pLanetPost(launch) {
  newFlightNumber++;
  launches.set(newFlightNumber, Object.assign(launch, {
    flightNumber: newFlightNumber,
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,

  }))


}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId)
  aborted.upcoming = false;
  aborted.success = false;
  return aborted
}


module.exports = {
    planetLaunches,
    pLanetPost,
    existsLaunchWithId,
    abortLaunchById
}