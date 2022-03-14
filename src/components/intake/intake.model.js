const {mongoose,Schema} = require('mongoose')

const IntakeSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  branches: [
    {
      name: {
        type: Schema.Types.String,
        required: true,
      },
      totalStudentsIntake: {
        type: Number,
        required: true,
      },
    },
  ],
});
const Intake = mongoose.model('Intake',IntakeSchema)
module.exports = Intake
