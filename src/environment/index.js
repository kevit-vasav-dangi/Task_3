const validateEnv = require('../utils/validateEnv.js')
const env = validateEnv

const environment = {
    NODE_ENV : env.NODE_ENV,
    APP_PORT:env.APP_PORT,
    MONGODB_URL:env.MONGODB_URL,
    JWT_PRIVATE_KEY:'atlas',
}

module.exports = environment