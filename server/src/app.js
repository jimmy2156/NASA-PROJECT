
const path = require('path')

const { application } = require('express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const planetsRouter = require('./routess/planets/planets.route');
const launchRouter = require('./routess/launches/launch.route')


const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(morgan('combined'))

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))

app.use('/planets',planetsRouter)
app.use('/launches',launchRouter)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})



module.exports = app