var express = require('express');
let router = express.Router();
const studentController  = require('../controllers/student-controller.js');

router.post("/registerstudent",studentController.REGISTERSTUDENT)
router.get("/profile", studentController.PROFILE)
router.post("/feepayment",studentController.FEEPAYMENT)
router.get("/attend", studentController.ATTEND)





module.exports = {router};