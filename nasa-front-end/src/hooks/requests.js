const API_URL = "v1"






async function httpGetPlanets() {

  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
const response = await fetch(`${API_URL}/launches`);
const fetchedLaunch = await response.json();
return fetchedLaunch.sort((a,b) => {
  return a.flightNumber - b.flightNumber
})

  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {

  try {
   return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "content-type": "application/json",

      },
      body: JSON.stringify(launch)
    })

  } catch(err) {
   return {
    ok: false
   }
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
try{
  return await fetch(`${API_URL}/launches/${id}`, {
    method: 'delete'
  })} catch (error) {
    return {
      ok: false
    }
  }
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};