//import fs from 'fs'
//import validateEnv from '../utils/validateEnv.js'
const validateEnv = require('../utils/validateEnv.js')
// const jwtPrivateKey = fs.readFileSync('')
// const jwitPublicKey = fs.readFileSync('')
const env = validateEnv

const environment = {
    NODE_ENV : env.NODE_ENV,
    APP_PORT:env.APP_PORT,
    MONGODB_URL:env.MONGODB_URL,
    //JWT_AUTH:env.JWT_AUTH_KEY,
    //JWT_PRIVATE_KEY:jwtPrivateKey,
    //JWT_PUBLIC_KEY:jwitPublicKey
}

//export default environment
module.exports = environment