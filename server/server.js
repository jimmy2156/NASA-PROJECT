const http = require('http')

const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: './.env'});
const app = require('./src/app')
const { loadPlanetData } = require('./src/model/planets.model')
const {loadLaunchData} = require('./src/model/launches.model')
const {loadingData} = require('./src/services/mongo')

const PORT = process.env.PORT;


const server = http.createServer(app)

async function start() {
await loadingData()
await loadPlanetData()
await loadLaunchData()
server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}...`)
})}

start()