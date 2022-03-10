//import HttpException from '../../utils/error.utils';
const HttpException = require('../../utils/error.util.js')
const { USER_ERROR_CODES } = require('./user.error.js')

//import { USER_ERROR_CODES } from './user.errors';
//import User from './user.model';
const User = require('./user.model.js')

module.exports = async function createNewUser(userBody) {
  try {
    return await User.create(userBody);
  } catch (error) {
    throw new HttpException(
      500,
      USER_ERROR_CODES.CREATE_USER_UNHANDLED_IN_DB,
      'CREATE_USER_UNHANDLED_IN_DB',
      error,
      {},
    );
  }
}
