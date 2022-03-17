const {Router}=require('express')
//import { Router } from 'express';
//import AnalyticsController from './analytics.controller';
const AnalyticsController = require('./analytics.controller.js')
//import { authenticateMiddleware } from '../../middleware/auth.middleware';
//const { authenticateMiddleware } = require('../../middlewares/auth.middleware.js')
const Authenticate = require('../../middlewares/auth.middleware.js')
//import { validateRequestMiddleware } from '../../middleware/error.middleware';
const { validateRequestMiddleware } = require('../../middlewares/error.middleware.js')

class AnalyticsRoute {
  path = '/analytics';

  router = Router();

  analyticsController = new AnalyticsController();
  authenticate = new Authenticate()
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/intakes`,
      this.authenticate.authorize,
      //   validateRequestMiddleware(signUpUserSchema),
      this.analyticsController.listOfBatches
    );
    this.router.post(
      `${this.path}/absent-students`,
      this.authenticate.authorize,
      //   validateRequestMiddleware(signUpUserSchema),
      this.analyticsController.findAbsentStudent
    );
    this.router.post(
      `${this.path}/vacant-seats`,
      this.authenticate.authorize,
      //   validateRequestMiddleware(signUpUserSchema),
      this.analyticsController.vacantSeats
    );
  }
}

module.exports = AnalyticsRoute
