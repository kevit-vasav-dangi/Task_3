
const {Router}= require('express')
//const app = require('../../../server.js')


const { validateRequestMiddleware } = require('../../middlewares/error.middleware.js')
const UserController = require('./user.controller.js')

const { signInUserSchema} = require('./user.model.js')


class UserRoutes {
  path = '';

  router = Router();

  userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.userController.signUpUser);
    this.router.post(
      `${this.path}/signIn`,
      /*validateRequestMiddleware(signInUserSchema),*/
      this.userController.signInUser,
    );
  }
}

module.exports = UserRoutes;
