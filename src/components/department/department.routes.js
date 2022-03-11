//import Router from 'express'
const Router = require('express')
//import { authenticationMiddleware } from '../../'
const { authorize } = require('../../middlewares/auth.middleware.js')
const DepartmentController = require('./department.controller.js')
//import DepartmentController from './department.controller.js'

class DepartmentRoute {
    path = '/department'
    router = Router()
    //departmentController = new DepartmentController()
    departmentController = new DepartmentController()

    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.departmentController.getDepartments);
        
        this.router.post(`${this.path}/update`, /*authorize,*/this.departmentController.addDepartment)
    }
}

//export default DepartmentRoute
module.exports = DepartmentRoute