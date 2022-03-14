const { Request, Response, NextFunction } = require('express')
const HttpException = require('../../utils/error.util.js')
const createNewUser = require('./user.DAL.js')
const User = require('./user.model.js')
const { USER_ERROR_CODES } = require('./user.error.js')

class UserController {
  async signUpUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const userObject = {
        name,
        email,
        password,
        role,
      };
      const user = await createNewUser(userObject);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  async signInUser(req, res , next ) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpException(400, USER_ERROR_CODES.SIGN_IN_BAD_REQUEST, 'SIGN_IN_BAD_REQUEST', '', {});
      }
      const userData = await User.findByCredentials(email, password);
      if (!userData) {
        throw new HttpException(404, USER_ERROR_CODES.SIGN_IN_FAIL, 'SIGN_IN_FAIL', '', {});
      }

      const userToken = await userData.getAuthToken();
      return res.status(200).json({
        accessToken: userToken,
        userId: userData._id,
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = UserController;
