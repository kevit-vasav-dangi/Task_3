const { filter } = require('compression');
const { Request, Response } = require('express')
const Student = require('./students.model.js')
const { sortByName, sortByBatch, sortBySemester } = require('./student.DAL.js');
const { levels } = require('pino');

class StudentsController {
    async getStudents(req, res) {
        try {
            // if (req.query.sortBy) {
            //     const parts = req.query.sortBy.split(':')
            //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            // }

            // let { page, size,sortByName,sortByBatch,sortBySemester} = req.query
            // if (!page) {
            //     page = 1;
            // }
            // if (!size) {
            //     size = 15;
            // }
            // //console.log(page,'size'+size);
            //console.log(sortBy);

            //let query = req.query

            // const limit = parseInt(size)
            // const skip = (page - 1) * size
            // console.log(sortByName);
            // console.log(sortBySemester);
            // console.log(sortByBatch);
            // if(sortByName){
            //     sortByName
            // }else if(sortByBatch){
            //     sortByBatch
            // }else if(sortBySemester){
            //     sortBySemester
            // }
            const nlimit = !(req.query.limit === undefined) ? (req.query.limit) : '0';
            const nskip = req.query.skip
            const queryString = req.query;
            const fkey = Object.keys(queryString)[2];
            const fvalue = Object.values(queryString)[2].trim();
            const skey = Object.keys(queryString)[3];
            const svalue = Object.values(queryString)[3].trim();
            const results = await Student.find({ [fkey]: fvalue })
                .limit(parseInt(nlimit))
                .skip(parseInt(nskip))
                .sort({ [skey]: svalue });
            //console.log(results);

            // const results = await Student.find({[key]:value}).limit(limit).skip(skip);
            //console.log(results);
            // const filters = req.query;
            // const filteredUsers = results.filter(student => {
            //   let isValid = true;
            //   for (let key in filters) {
            //    isValid = isValid && student[key] == filters[key] 
            //   }
            //   return isValid;
            // });
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
