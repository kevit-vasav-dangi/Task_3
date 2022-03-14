const { Request, Response } = require('express')
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
        console.log(req.body);
        const student = new Student(req.body);
        try {
            await student.save();
            res.status(201).json({ student });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = StudentsController
