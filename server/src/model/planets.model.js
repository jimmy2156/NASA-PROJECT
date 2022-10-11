
const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse');
const planets = require('./planet.mongo')


function ishabitialPlanets(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6
}


function loadPlanetData() {
    return new Promise((resolve, reject) => { 
        
fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({comment: '#',
columns: true}))
  .on('data',  (data) => {
    if (ishabitialPlanets(data)) {
        getAllPlanets(data)
    }})
  .on('error', (err) => {
    console.log(err)
    reject(err)
  })
  .on('end', async () => {
    const countAllPlanet = (await allPlanets()).length
    console.log(`${countAllPlanet} habitable planets found`);
  resolve();
   
    })
   
})

 }

async function allPlanets() {
  return await planets.find({})
}
async function getAllPlanets(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name
    },
    {
      keplerName: planet.kepler_name
    },
    {
      upsert: true
    })
}
   
  catch(err) {
   console.error(`mongo couldnt extract planets ${err}`)
  }
}


module.exports = {
    loadPlanetData,
    allPlanets
}