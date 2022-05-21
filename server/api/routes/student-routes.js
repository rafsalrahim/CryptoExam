var express = require('express');
let router = express.Router();
const studentController  = require('../controllers/student-controller.js');

router.post("/verifyexam", studentController.VERIFYEXAM)
router.post("/registerstudent",studentController.REGISTERSTUDENT)
router.post("/profile", studentController.PROFILE)
router.post("/feepayment",studentController.FEEPAYMENT)
router.post("/attend", studentController.ATTEND)
router.post("/submitexam",studentController.SUBMITEXAM)
router.post("/generateresult", studentController.GENERATERESULT)
router.post("/getexam", studentController.GETEXAM)





module.exports = {router};