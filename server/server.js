const http = require('http')
const mongoose = require('mongoose')
const app = require('./src/app')
const { loadPlanetData } = require('./src/model/planets.model')
const PORT = 8000
const MONGO_URL = 'mongodb+srv://jimmy:21562156@nasacluster.6inp9lf.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open',() => {
console.log('MongoDb is connection ready')
})
mongoose.connection.on('error',(err) => {
console.error(err)
})

const server = http.createServer(app)

async function start() {
await mongoose.connect(MONGO_URL)
await loadPlanetData()
server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}...`)
})}

start()