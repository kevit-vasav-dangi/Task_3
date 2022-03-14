const HttpException = require('../../utils/error.util.js')
const { USER_ERROR_CODES } = require('./user.error.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = async function createNewUser(userBody) {
  try {
    const user =  new User(userBody)
    await user.save()
    return user
    //return  await  User.create(userBody);
  } catch (error) {
    console.log(error);
    // throw new HttpException(
    //   500,
    //   USER_ERROR_CODES.CREATE_USER_UNHANDLED_IN_DB,
    //   'CREATE_USER_UNHANDLED_IN_DB',
    //   error,
    //   {},
    // );
  }
}
