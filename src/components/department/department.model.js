const {mongoose,Schema} = require('mongoose')

const departmentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    }
})
const Department = mongoose.model('Department',departmentSchema)

module.exports = Department