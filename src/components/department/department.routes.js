const Router = require('express')
//const { autentic } = require('../../middlewares/auth.middleware.js')
const Authenticate = require('../../middlewares/auth.middleware.js')
const DepartmentController = require('./department.controller.js')

class DepartmentRoute {
    path = '/department'
    router = Router()
    departmentController = new DepartmentController()
    authenticate = new Authenticate()
    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.departmentController.getDepartments);
        
        this.router.post(`${this.path}/update`,this.authenticate.authorize ,this.departmentController.addDepartment)
    }
}

module.exports = DepartmentRoute