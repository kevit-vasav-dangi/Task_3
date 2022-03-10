//import { Router } from 'express';
const {Router} = require('express')

//import AttendenceController from './attendence.controller';
const AttendenceController = require('./attendance.controller.js')
class AttendenceRoute {
  path = '';

  router = Router();

  attendenceController = new AttendenceController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}/addAttendence`, this.attendenceController.addAttendence);
  }
}

module.exports = AttendenceRoute;
