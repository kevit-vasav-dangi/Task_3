const {Router} = require('express')
const IntakeController = require('./intake.controller.js')

class IntakeRoute {
  path = '/intake';

  router = Router();

  intakeController = new IntakeController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/getintake`, this.intakeController.getIntake);
    this.router.post(`${this.path}/addintake`, this.intakeController.addIntake);
  }
}
module.exports = IntakeRoute;
