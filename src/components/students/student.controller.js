const { filter } = require('compression');
const { Request, Response } = require('express')
const Student = require('./students.model.js')
const { sortByName, sortByBatch, sortBySemester } = require('./student.DAL.js');
const { levels } = require('pino');

class StudentsController {
    async getStudents(req, res) {
        try {
            
            const queryString = req.query;
            const filterKey = Object.keys(queryString)[2];
            const filterValue = Object.values(queryString)[2]
            const sortKey = Object.keys(queryString)[3];
            const sortValue = Object.values(queryString)[3]
            const results = await Student.find({ [filterKey]: filterValue })
                .limit(parseInt(req.query.limit))
                .skip(parseInt(req.query.skip))
                .sort({ [sortKey]: sortValue });
            
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
