//import Config from '../environment/index.js'
const Config = require('../environment/index.js')
//import mongoose from 'mongoose'
const mongoose = require('mongoose')

const dbConnection = {
    url: Config.MONGODB_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}
mongoose.connect(Config.MONGODB_URL,{

})

//export default dbConnection
module.exports = dbConnection