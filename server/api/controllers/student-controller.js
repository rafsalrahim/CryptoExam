const studentModel = require('../models/student-model.js');

const REGISTERSTUDENT = async (req, res, next) =>{
    try{
        result = await studentModel.REGISTERSTUDENT(req.body.from, req.body.email);
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

const SUBMITEXAM = async (req, res, next) =>{
    try{
        result = await studentModel.SUBMITEXAM(req.body.ans);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const GENERATERESULT = async (req, res, next) =>{
    try{
        result = await studentModel.GENERATERESULT(req.body.ans);
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
    ATTEND,
    SUBMITEXAM,
    GENERATERESULT
}