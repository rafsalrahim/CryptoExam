var express = require('express');
let router = express.Router();
const contractController  = require('../controllers/contract-controller.js');

router.post("/deploy", contractController.DEPLOY)

module.exports = {router};