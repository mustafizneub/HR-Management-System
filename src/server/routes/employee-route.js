const router = require('express').Router();

const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only image", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});



const {
  getEmployees,
  addEmployee,
  updateEmployee,
  getEmployee,
  deleteEmployee
} = require('../controllers/EmployeeController')

router
  .route('/employees/all-employee')
  .get(getEmployees)
  .post(upload.single('photo'), addEmployee)

router
  .route('/employees/all-employee/:id')
  .get(getEmployee)
  .patch(upload.single('photo'), updateEmployee)
  .delete(deleteEmployee)


module.exports = router;
