const contractModel = require('../models/contract-model.js');

const DEPLOY = async (req, res, next) =>{
    try{
        result = await contractModel.DEPLOY();
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    DEPLOY
}