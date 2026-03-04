const express = require("express");
const StudentController = require("../controller/StudentController");
const router = express.Router();

router.get('/student/list',StudentController.getStudentList)
router.get('/student/:id',StudentController.getStudent)
router.post('/student/add',StudentController.addStudent)
router.put('/student/edit/:id',StudentController.updateStudent)
router.delete('/student/delete/:id',StudentController.deleteStudent)

module.exports = router;