const { mongoose, Model, Schema } = require('mongoose')
//import bcryptjs from 'bcryptjs';
//import jwt from 'jsonwebtoken';
//import validator from 'validator';
const validator = require('validator')
//import Config from '../../environment/index';
//import HttpException from '../../utils/error.utils';
//import { USER_ERROR_CODES } from './user.errors';
const { USER_ERROR_CODES } = require('./user.error.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Config = require('../../environment/index.js')
const HttpException = require('../../utils/error.util.js')
// const User = mongoose.model('User')
const signInUserSchema = new Schema({
  email: {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    //errorMessage: 'Enter valid email Id',
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password');
      }
    }
    //errorMessage: 'Enter valid password',
  }
})

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password');
      }
    },
  },
  role: {
    type: Schema.Types.String,
    enum: ['admin', 'staff'],
    required: true,
  },
});

UserSchema.statics.findByCredentials = async function (email, password) {
  // console.log(email);
  // console.log(password);
  const user = await this.findOne({ email });
  console.log(user);

  if (!user) {
    throw new HttpException(404, USER_ERROR_CODES.USER_NOT_FOUND, 'USER_NOT_FOUND', '', {
      emailId: email,
    });
  }

  const res = await bcryptjs.compare(password, user.password);

  if (res === true) {
    return user;
  }
  throw new HttpException(404, USER_ERROR_CODES.INCORRECT_PASSWORD, 'INCORRECT_PASSWORD', '', {});
};

UserSchema.statics.findByToken = async function (token) {
  let decoded;
  try {
    decoded = jwt.verify(token, Config.JWT_PRIVATE_KEY);
  } catch (error) {
    let hasSessionExpired = false;
    if (error && error.message.includes('jwt expired')) {
      hasSessionExpired = true;
    }
    if (hasSessionExpired) {
      throw new HttpException(404, USER_ERROR_CODES.USER_SESSION_EXPIRED, 'USER_SESSION_EXPIRED', '', {});
    } else {
      throw new HttpException(404, USER_ERROR_CODES.AUTH_FAILED, 'AUTH_FAILED', '', {});
    }
  }
  return this.findOne({
    _id: decoded._id,
    // accessToken: token,
  });
};

UserSchema.methods.getAuthToken = function () {
  const access = 'auth';
  const token = jwt
    .sign({ _id: this._id.toHexString(), access }, Config.JWT_PRIVATE_KEY, {
      expiresIn: '3d', // 3 days
    })
    .toString();

  this.accessToken = token;

  return this.save().then(() => token);
};

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
});
userModel = mongoose.model('User', UserSchema),
  //export default mongoose.model<user, x>('User', UserSchema);
  module.exports = {
    userModel,
    signInUserSchema
  } 
