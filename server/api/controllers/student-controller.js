const studentModel = require('../models/student-model.js');

const REGISTERSTUDENT = async (req, res, next) =>{
    try{
        result = await studentModel.REGISTERSTUDENT(req.body.email);
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const PROFILE = async (req, res, next) =>{
    try{
        result = await studentModel.PROFILE();
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const FEEPAYMENT = async (req, res, next) =>{
    try{
        result = await studentModel.FEEPAYMENT(req.body.feeAmount);
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const ATTEND = async (req, res, next) =>{
    try{
        result = await studentModel.ATTEND();
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    REGISTERSTUDENT,
    PROFILE,
    FEEPAYMENT,
    ATTEND
}