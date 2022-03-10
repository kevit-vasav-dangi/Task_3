// //import validator from 'validator';
// const validator = require('validator')
// //import mongoose from 'mongoose'
// const mongoose = require('mongoose')
// //import { number } from 'yargs';

// const { Schema, model } = mongoose;

// const studentSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('email is invalid')
//             }
//         }
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: Number,
//         length: 10,
//         required: true
//     },
//     batch: {
//         type: Number,
//         required: true
//     },
//     currentSem: {
//         type: Number,
//         maxlength: 1,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7
//     }
// })
// //export const Student = mongoose.model('students', studentSchema)
// module.exports = mongoose.model('students',studentSchema)
//import mongoose, { Schema } from 'mongoose';
const {mongoose,Schema}= require('mongoose')


const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      length: 10,
      trim: true,
      unique: true,
      validate(value) {
        if (value.length < 10) {
          throw new Error('Phone number must be at least 10 characters long');
        }
      },
    },
    department: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

StudentSchema.virtual('attendence', {
  ref: 'Attendence',
  localField: '_id',
  foreignField: 'studId',
});

//export default mongoose.model<IStudent>('Student', StudentSchema);
module.exports=mongoose.model('Student', StudentSchema)
