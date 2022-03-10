//import mongoose, { Document, Schema } from 'mongoose';
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
module.exports = mongoose.model('Intake',IntakeSchema)
//export default mongoose.model<intake>('Intake', IntakeSchema);
