const { Response, Request } = require('express')

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
module.exports = AttendenceController
