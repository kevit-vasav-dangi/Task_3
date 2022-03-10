//import { Router } from 'express';
const { Router } = require('express')
//import StudentController from '../students/student.controller.js';
const StudentController = require('./student.controller.js')
class StudentsRoute {
    path = '/users';
    router = Router();

    studentController = new StudentController();
    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        //this.router.get(`${this.path}`,this.StudentController.add)
        this.router.get(`${this.path}`,this.studentController.getStudents)
        //this.router.get(`${this.path}`, this.studentsController.getStudents);
        this.router.post(`${this.path}/addStudents`, this.studentController.addStudent)
    }
}

//const StudentsRoute = new StudentsRoute()
module.exports = StudentsRoute