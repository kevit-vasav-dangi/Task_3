// const { Request , Response } = require('express')
// const Student = require('./students.model.js')

// class StudentsController {
//     async add(req,res,next){
//         try{
//             const { name, department, year, semester, admissionDate, mobile, address, UIDAI, isActive } = req.body;
//             if (req && req.user && !req.user.isActive) {
//                 throw Error('USER IS NOT AUTHORIZED');
//             }
//             const studentObject = { name, department, year, semester, admissionDate, mobile, address, UIDAI, isActive };
//         if (!(await checkVacantSeats(studentObject.department, studentObject.year))) {
//         return next('Housefull');
//             }
//             studentObject.department = new mongoose.Types.ObjectId(studentObject.department);
//             const student = await createNewStudent(studentObject);
//             return res.status(201).send(student);
//         }
//         catch(e){
//             return next(e)
//         }
//     }
// }
// module.exports = StudentsController
//import {  } from 'express';
const {Request, Response} = require('express')
//import Student from './student.model';
const Student = require('./students.model.js')

class StudentsController {
  async getStudents(req, res) {
    try {
      const results = await Student.find().exec();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }

  async addStudent(req, res) {
    const student = new Student(req.body);
    try {
      await student.save();
      res.status(201).json({ student });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

//export default StudentsController;
module.exports = StudentsController
