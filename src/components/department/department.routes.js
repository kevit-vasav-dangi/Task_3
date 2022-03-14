const Router = require('express')
const { authorize } = require('../../middlewares/auth.middleware.js')
const DepartmentController = require('./department.controller.js')

class DepartmentRoute {
    path = '/department'
    router = Router()
    departmentController = new DepartmentController()

    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.departmentController.getDepartments);
        
        this.router.post(`${this.path}/update`, /*authorize,*/this.departmentController.addDepartment)
    }
}

module.exports = DepartmentRoute