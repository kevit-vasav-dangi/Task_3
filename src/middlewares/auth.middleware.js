
const { NextFunction,Request , Response } = require('express')
const User = require('../components/user/user.model.js')
const HttpException = require('../utils/error.util.js')

const AUTH_ERROR_CODES = {
    HEADERS_NOT_SET_IN_REQUEST: 'Request not contain auth token'
};

  //console.log('hello');
  
    const authorize = async (req, res, next)=> {
      const token = req.header('authorization').replace('Bearer ', '');
      //console.log(token);
      console.log(`"Token = "`, token);
  
      if (!token) {
        throw new HttpException(400, AUTH_ERROR_CODES.HEADERS_NOT_SET_IN_REQUEST, 'HEADERS_NOT_SET_IN_REQUEST', '', {});
      }
  
      const user = await User.findByToken(token);
  
      if (!user) {
        throw new HttpException(404, USER_ERROR_CODES.USER_NOT_FOUND, 'USER_NOT_FOUND', '', {});
      }
  
      req.user = user;
  
      next();
    }
  

// module.exports = authenticationMiddleware
// const authenticationMiddleware = new Authenticate()
module.exports =  authorize