const studentModel = require('../models/student-model.js');
const ipfsModel = require('../models/ipfs-model.js');

const VERIFYEXAM = async (req, res, next) =>{
    try{
        result = await studentModel.VERIFYEXAM(req.body.from);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const GETEXAM = async (req, res, next) =>{
    try{
        result = await studentModel.GETEXAM(req.body.from);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const REGISTERSTUDENT = async (req, res, next) =>{
    try{
        result = await studentModel.REGISTERSTUDENT(req.body.from, req.body.email);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const PROFILE = async (req, res, next) =>{
    try{
        result = await studentModel.PROFILE(req.body.from);
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const FEEPAYMENT = async (req, res, next) =>{
    try{
        result = await studentModel.FEEPAYMENT(req.body.from, req.body.feeAmount);
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const ATTEND = async (req, res, next) =>{
    try{
        result = await studentModel.ATTEND(req.body.from);
        console.log(result);
        qus_file = await ipfsModel.GETFILE(result["q_hash"]);
        console.log(qus_file);
        res.status(200).json(qus_file);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const SUBMITEXAM = async (req, res, next) =>{
    try{
        result = await studentModel.SUBMITEXAM(req.body.from, req.body.ans);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const GENERATERESULT = async (req, res, next) =>{
    try{
        result = await studentModel.GENERATERESULT(req.body.from);
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
    GENERATERESULT,
    VERIFYEXAM,
    GETEXAM
}