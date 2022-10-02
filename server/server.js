const http = require('http')
const app = require('./src/app')
const { loadPlanetData } = require('./src/model/planets.model')
const PORT = 8000



const server = http.createServer(app)

async function start() {
await loadPlanetData()
server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}...`)
})}

start()