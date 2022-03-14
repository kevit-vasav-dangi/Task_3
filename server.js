//import App from './app.js'
const App = require('./app.js')
const DepartmentRoute = require('./src/components/department/department.routes.js')
const AnalyticsRoute = require('./src/components/analytics/analytics.routes')
//import DepartmentRoute from './src/components/department/department.routes.js';
const StudentsRoute = require('./src/components/students/students.routes.js')
//import StudentsRoute from './src/components/students/students.routes.js';
const IntakeRoute = require('./src/components/intake/intake.routes.js')
const AttendenceRoute = require('./src/components/attendance/attendance.routes.js')
const UserRoutes = require('./src/components/user/user.routes.js')

const app = new App([new UserRoutes(),new DepartmentRoute(),new StudentsRoute(), new IntakeRoute(),new AttendenceRoute(),new AnalyticsRoute()]);
app.listen()
module.exports = app
