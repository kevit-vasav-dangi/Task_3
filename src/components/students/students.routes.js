const { Router } = require('express')
const StudentController = require('./student.controller.js')
class StudentsRoute {
    path = '/users';
    router = Router();

    studentController = new StudentController();
    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.get(`${this.path}`,this.studentController.getStudents)
        this.router.post(`${this.path}/addStudents`, this.studentController.addStudent)
    }
}

module.exports = StudentsRoute