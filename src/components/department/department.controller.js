// //import { Response, Request } from 'express';
// const { Request, Response } = require('express')
// //import HttpException from '../../utils/error.util';
// const HttpException = require('../../utils/error.util.js')
// //import Department from './department.model.js';
// const Department = require('./department.model.js')
// //import { DEPARTMETN_ERROR_CODES } from '';


// class DepartmentController {
//   async create(req, res, next) {
//     try {
//       const { name, startDate, batches, isActive } = req.body;
//       if (req && req.user && (!req.user.isActive || !req.user.isAdmin)) {
//         throw Error('user is not authorized')
//       }
//       const departmentObject = { name, startDate, batches, isActive }
//       const department = await createNewDepartment(departmentObject)
//       return res.status(201).send(department)
//     }
//     catch (e) {
//       return next(e)
//     }
//   }
//   async update(req, res, next) {
//     //const updates: Array<> = Object.keys(req.body);
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['batches', 'isActive', 'name']
//     const updateMatch = updates.every(updates => allowedUpdates.includes(updates))

//     if (!updateMatch) {
//       throw new Error('some fields are not updating')
//     }
//     try {
//       if (req && req.user && (!req.user.isActive || !req.user.isAdmin)) {
//         throw new Error('User not authorized')
//       }
//     }
//     catch (e) {

//     }
//     const department = await Department.findByDepartment(req.body.name)
//     let flag = false;
//     let result;
//     for (let batchNo = 0; batchNo < department.batches.length; batchNo++) {
//       if (department.batches[batchNo].year === (req && req.body && req.body.batches.year)) {
//         result = updateDepartment(req.body);
//         flag = true;
//       }
//     }
//     if (!flag) {
//       department.batches.push(req.body.batches);
//       await department.save();
//       return res.status(200).send({ batch: req.body, message: 'batch not found added successfully' });
//     }
//     return res.status(200).send({ batch: req.body, message: 'batch updated successfully' });
//   } catch(err) {
//     return next(err);
//   }
// }
// module.exports = DepartmentController
//import { Response, Request } from 'express';
//import HttpException from '../../utils/error.utils';
const HttpException = require('../../utils/error.util.js')
//import Department from './department.model';
const Department = require('./department.model.js')
//import { DEPARTMENT_ERROR_CODES } from './department.errors';
const  { DEPARTMENT_ERROR_CODES } = require('./department.error.js')

class DepartmentController {
  async getDepartments(req, res)  {
    try {
      const results = await Department.find().exec();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }

  async addDepartment(req, res) {
    const department = new Department(req.body);
    console.log(req.body);
    try {
      if (req.user.role === 'admin') {
        await department.save();
        res.status(200).send({ department });
      } else {
        throw new HttpException(401, DEPARTMENT_ERROR_CODES.AUTH_FAILED, 'UNAUTHORIZED', '', {});
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

//export default DepartmentController;
module.exports = DepartmentController
