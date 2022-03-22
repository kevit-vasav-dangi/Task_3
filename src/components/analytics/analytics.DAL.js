const mongoose = require('mongoose')
const HttpException = require('../../utils/error.util.js')
const Attendance = require('../attendance/attendance.model.js')
const Intake = require('../intake/intake.model.js')
const { ANALYTICS_ERROR_CODES } = require('./analytics.error.js')

const findBranchesOrdByTotalStudents = async () => {
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
const listOfAbsentStudents = async (year, absentdate, semester, department) => {
  try {
    return await Attendance.aggregate([
      {
        $match: {
          absentDate: new Date(absentdate),
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: 'userId',
          foreignField: '_id',
          as: 'studentDetails',
        },
      },
      {
        $unwind: '$studentDetails',
      },
      {
        $match: {
          'studentDetails.year': year,
          'studentDetails.semester': semester,
          'studentDetails.department': new mongoose.Types.ObjectId(department),
        },
      },
      {
        $project: {
          name: '$studentDetails.name',
          _id: 0,
        },
      },
    ]);
  } catch (err) {
    throw new HttpException(500, ANALYTICS_ERROR_CODES.AUTH_FAILED, 'AUTH_FAILED', err, null);
  }
}

const listVacantSeats = async () => {
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
          totalStudentsIntake: { $sum: '$branches.totalStudentsIntake' },
        },
      },
      {
        $sort: {
          totalStudentsIntake: -1,
        },
      },
      {
        $lookup: {
          from: 'students',
          pipeline: [
            {
              $group: {
                _id: '$year',
                totalStudents: { $sum: 1 },
              },
            },
          ],
          as: 'students',
        },
      },
      {
        $project: {
          totalStudentsIntake: 1,
          branches: 1,
          students: {
            $filter: {
              input: '$students',
              cond: {
                $eq: ['$$this._id', '$_id'],
              },
            },
          },
        },
      },
      {
        $unwind: { path: '$students', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          totalStudentsIntake: 1,
          branches: 1,
          students: {
            $ifNull: ['$students', null, { _id: '$_id', totalStudents: 0 }],
          },
        },
      },
      {
        $project: {
          _id: 0,
          batch: '$_id',
          branches: '$branches',
          totalStudents: '$students.totalStudents',
          totalStudentsIntake: 1,
          availableIntake: {
            $subtract: ['$totalStudentsIntake', '$students.totalStudents'],
          },
        },
      },
    ]);
  } catch (err) {
    throw new HttpException(500, ANALYTICS_ERROR_CODES.AUTH_FAILED, 'AUTH_FAILED', err, null);
  }
}
module.exports = { findBranchesOrdByTotalStudents, listOfAbsentStudents, listVacantSeats }
