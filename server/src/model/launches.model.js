const launchesDatabase = require('./launch.mongo')
const planets = require('./planet.mongo')

const DEFAULT_FLIGHT_NUMBER = 10


//const launches = new Map();
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

//launches.set(launch.flightNumber, launch);
getAllPlanets(launch)

function existsLaunchWithId(launchId) {
  return launches.has(launchId)
}
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne({}).sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }

  return latestLaunch.flightNumber
}

async function planetLaunches() {
    return  await launchesDatabase.find({}, {
      _id: 0, __v: 0
    })
}
// function pLanetPost(launch) {
//   newFlightNumber++;
//   launches.set(newFlightNumber, Object.assign(launch, {
//     flightNumber: newFlightNumber,
//     customer: ['ZTM', 'NASA'],
//     upcoming: true,
//     success: true,

//   }))


//}
async function planetPost1(launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    flightNumber: newFlightNumber}
  )
  await getAllPlanets(newLaunch)
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId)
  aborted.upcoming = false;
  aborted.success = false;
  return aborted
}
async function getAllPlanets(launch) {
const planet = await planets.findOne({keplerName: launch.target})

if (!planet) {
  throw new Error('panet is not habitial')
}


  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
}


module.exports = {
    planetLaunches,
    planetPost1,
    existsLaunchWithId,
    abortLaunchById
}