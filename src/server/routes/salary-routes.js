const router = require('express').Router();
const {
  addSalary,
  getSalary,
  addAllowance,
  getAllowance,
  updateAllowance
} = require('../controllers/SalaryController')



router
  .route('/payroll/employee-salary')
  .post(addSalary)
  .get(getSalary)
// router.post('/payroll/employee-salary', addSalary)
// router.get('/get-salary', getSalary)


router.route('/payroll/employee-salary/salary-history/:id')
  .post(addAllowance)
  .get(getAllowance)
  .patch(updateAllowance)
module.exports = router;
