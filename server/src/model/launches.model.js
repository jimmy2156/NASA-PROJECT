const launchesDatabase = require('./launch.mongo')
const planets = require('./planet.mongo')
const axios = require('axios')


const DEFAULT_FLIGHT_NUMBER = 100


//const launches = new Map();
let newFlightNumber = 100
const launch = {
    flightNumber: 100, //flight_number
    mission: 'Kepler Exploration X', //name
    rocket: 'Explorer IS1', //rocket.name
    launchDate: new Date('December 27, 2030'), //date_local
    target: 'Kepler-442 b', //not applicable
    customer: ['ZTM', 'NASA'], //payload.customers
    upcoming: true, //upcoming
    success: true, //success
};

//launches.set(launch.flightNumber, launch);
getAllPlanets(launch)

async function existsLaunchWithId(launchId) {
  return await findLaunch({flightNumer: launchId})
}
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne({}).sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }

  return latestLaunch.flightNumber
}

async function planetLaunches(skip, limit) {
    return  await launchesDatabase.find({}, {
      _id: 0, __v: 0
    })
    .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit)
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
  const planet = await planets.findOne({keplerName: launch.target})

if (!planet) {
  throw new Error('panet is not habitial')
}

  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    flightNumber: newFlightNumber}
  )
  await getAllPlanets(newLaunch)
}

async function abortLaunchById(launchId) {
const aborted = await launchesDatabase.updateOne({
  flightNumber: launchId
}, {
  upcoming: false,
  success: false
})

return aborted.modifiedCount === 1;
}
async function getAllPlanets(launch) {


  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
}

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'
async function loadedData() {
  const response = await axios.post(SPACEX_API_URL, {
  
    query: {},
    options: {
      pagination: false,
        populate: [
           {
               path: 'rocket',
               select: {
                   name: 1
               }
           },
           {
            path: 'payloads',
            select: {
              customers: 1
            }
           }
        ]
    }
}
)

const launchDocs = response.data.docs;
for (const launchDoc of launchDocs) {
  const payloads = launchDoc['payloads'];
  const customers = payloads.flatMap((payload) => {
    return payload['customers']
  })
  const launch = {
    flightNumber: launchDoc['flight_number'],
    mission: launchDoc['name'],
    rocket: launchDoc['rocket']['name'],
    launchDate: launchDoc['date_local'],
    upcoming: launchDoc['upcoming'],
    success: launchDoc['success'],
    customers

  }
  console.log(`${launch.flightNumber} ${launch.mission}`)
  await getAllPlanets(launch)
}

}



async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter)
}

async function loadLaunchData() {

const firstLaunch = await findLaunch({
  flightNumber: 1,
  rocket: 'Falcon 1',
  mission: 'FalconSat'
})

if (firstLaunch) {
  console.log("data is already loaded")
  return;

} else {
  loadedData()

}



}



module.exports = {
    planetLaunches,
    planetPost1,
    existsLaunchWithId,
    abortLaunchById,
    loadLaunchData
}