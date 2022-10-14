const mongoose = require('mongoose')


const launchSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    customer: {
        type: Array,
        required: true,
        default: ['ZTM', 'NASA']
    },
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
    target: {
        type: String
    }
})

module.exports = mongoose.model('launch', launchSchema)