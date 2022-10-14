const mongoose = require('mongoose')


const MONGO_URL = process.env.MONGO_URI

mongoose.connection.once('open',() => {
console.log('MongoDb is connection ready')
})
mongoose.connection.on('error',(err) => {
console.error(err)
})

async function loadingData() {
    await mongoose.connect(MONGO_URL)
}

async function loadingDataDisconnect() {
    await mongoose.disconnect(MONGO_URL)
}
module.exports = { loadingData, loadingDataDisconnect }