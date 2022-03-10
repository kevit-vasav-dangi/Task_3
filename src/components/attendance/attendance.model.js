//import mongoose, { ObjectId, Schema } from 'mongoose';
const {mongoose,Schema} =require('mongoose')



const AttendenceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student',
  },
  semester: {
    type: Schema.Types.String,
    required: true,
  },
  isPresent: {
    type: Schema.Types.Boolean,
    required: true,
  },
  onDate: {
    type: Schema.Types.Date,
    required: true,
  },
});

module.exports =  mongoose.model('Attendence', AttendenceSchema);
