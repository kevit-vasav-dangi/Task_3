const { Response , Request , NextFunction}= require('express')
const HttpException = require('../../utils/error.util.js')
const {findBranchesOrdByTotalStudents,listOfAbsentStudents} = require('./analytics.DAL.js')
const { ANALYTICS_ERROR_CODES } = require('./analytics.error.js')

class AnalyticsController {
  async listOfBatches(req, res, next) {
    try {
      console.log(req.user.role);
      // if (req && req.user && (!req.user.isActive || !req.user.role)) {
      //   throw Error('USER IS NOT AUTHORIZED');
      // }
      const result = await findBranchesOrdByTotalStudents();
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  }
  async findAbsentStudent(req, res, next) {
    try {
      const { year, date, semester, department } = req.body;
      console.log(req.body);
      // if (req && req.user && (!req.user.isActive || !req.user.isAdmin)) {
      //   throw Error('USER IS NOT AUTHORIZED');
      // }
      const result = await listOfAbsentStudents(year, date, semester, department);
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  }
}

//export default AnalyticsController;
module.exports = AnalyticsController
