//import mongoose, { ObjectId, Schema } from 'mongoose';
const {mongoose,Schema} =require('mongoose')



const AttendenceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique:true,
    ref: 'students',
  },
  department:{
    type:Schema.Types.ObjectId,
    ref:'departments'
  },
  absentDate:{
    type:Schema.Types.Date,
    required:true
  },
  isAbsent: {
    type: Schema.Types.Boolean,
    required: true,
  },
  isStudent: {
    type: Schema.Types.Date,
    required: true,
  },
});

module.exports =  mongoose.model('Attendence', AttendenceSchema);
