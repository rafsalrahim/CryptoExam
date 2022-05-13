var express = require('express');
let router = express.Router();
const adminController  = require('../controllers/admin-controller.js');

router.get("/check", adminController.CHECK)

module.exports = {router};