const { Request, Response } = require('express')
const Student = require('./students.model.js')

class StudentsController {
    async getStudents(req, res) {
        try {
            if (req.query.sortBy) {
                const parts = req.query.sortBy.split(':')
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            }
            let { page, size } = req.query
            if (!page) {
                page = 1;
            }
            //console.log(page);
            if (!size) {
                size = 5;
            }
            //console.log(size);
            const limit = parseInt(size)
            const skip = (page - 1) * size

            const results = await Student.find().limit(limit).skip(skip).sort({ name: 1 });

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
