const adminModel = require('../models/admin-model.js');

const CHECKBAL = async (req, res, next) =>{
    try{
        result = await adminModel.CHECKBAL();
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const GETSTUDENT = async (req, res, next) =>{
    try{
        console.log(req.body.address);
        result = await adminModel.GETSTUDENT(req.body.address);
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    CHECKBAL,
    GETSTUDENT
}