const Config = require('../environment/index.js')
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
module.exports = dbConnection