//import { Response, Request } from 'express';
const { Response, Request } = require('express')
// import { ATTENDENCE_ERROR_CODES } from './attendence.errors';
// import HttpException from '../../utils/error.utils';
//import Attendence from './attendence.model';
const Attendence = require('./attendance.model')


class AttendenceController {
  async addAttendence(req  , res) {
    const attendence = new Attendence(req.body);

    try {
      await attendence.save();
      res.status(200).json({ attendence });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
//export default AttendenceController;
module.exports = AttendenceController
// import { Request, Response, Application } from 'express';

// // TODO Figure out how NOT to use require here.
// const express = require('express');
// var app: Application = express();

// app.get('/', function (req: Request, res: Response) {
//   res.send('Hello World')
// });

// app.listen(3000);
