//import { Request, Response } from 'express';
const { Request, Response } = require('express')
//import Intake from './intake.model';
const Intake = require('./intake.model.js')

class IntakeController {
  async getIntake(req, res)  {
    try {
      const results = await Intake.find().exec();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }

  async addIntake(req, res){
    const intake = new Intake(req.body);
    console.log('body =', req.body);
    try {
      await intake.save();
      res.status(200).send({ intake });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
//export default IntakeController;
module.exports = IntakeController
