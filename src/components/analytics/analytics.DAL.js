//import mongoose from 'mongoose';
const mongoose = require('mongoose')
//import HttpException from '../../utils/error.utils';
const HttpException = require('../../utils/error.util.js')
//import Attendance from '../attendance/attendance.model';
const Attendance = require('../attendance/attendance.model.js')
//import Batches from '../batches/batch.model';
const Intake = require('../intake/intake.model.js')
//import { ANALYTICS_ERROR_CODES } from './analytics.error';
const { ANALYTICS_ERROR_CODES } = require('./analytics.error.js')

async function findBranchesOrdByTotalStudents() {
  try {
    return await Intake.aggregate([
      {
        $unwind: '$branches',
      },
      {
        $group: {
          _id: '$year',
          branches: {
            $push: '$branches',
          },
          totalStudents: { $sum: '$branches.totalStudentsIntake' },
        },
      },
      {
        $sort: {
          totalStudents: -1,
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
          branches: 1,
          totalStudents: 1,
        },
      },
    ]);
  } catch (err) {
    throw new HttpException(500, ANALYTICS_ERROR_CODES.AUTH_FAILED, 'AUTH_FAILED', err, null);
  }
}
module.exports= findBranchesOrdByTotalStudents()