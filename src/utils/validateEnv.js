//import 'dotenv/config'
require('dotenv/config')
//import { bool, cleanEnv, port, str } from 'envalid'
const { bool, cleanEnv, port, str } = require('envalid')

const validateEnv = cleanEnv(process.env, {
    NODE_ENV: str({
        devDefault: 'development',
        default: 'production',
        choices: ['development', 'production'],
        desc: 'Current Environment',
      }),
    APP_PORT: port(),
    MONGODB_URL: str({
        devDefault: 'mongodb://localhost:27017/Task3-dev',
        default: 'mongodb://localhost:27017/Task3-prod'
    })
})

//export default validateEnv
module.exports = validateEnv