var express = require('express');
let router = express.Router();
const adminController  = require('../controllers/admin-controller.js');

router.get("/check", adminController.CHECK)
router.post("/getstudent",adminController.GETSTUDENT)

module.exports = {router};