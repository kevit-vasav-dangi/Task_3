const HttpException = require('../../utils/error.util.js')
const Department = require('./department.model.js')
const { DEPARTMENT_ERROR_CODES } = require('./department.error.js')

class DepartmentController {
  async getDepartments(req, res) {
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
    console.log(req.user)
    const department = new Department(req.body);
    //console.log(req.body);
    try {
      //console.log(req.body.user);
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

module.exports = DepartmentController
