var express = require('express');
let router = express.Router();
const adminController  = require('../controllers/admin-controller.js');

router.get("/checkbalance", adminController.CHECKBAL)
router.post("/getstudent",adminController.GETSTUDENT)

module.exports = {router};