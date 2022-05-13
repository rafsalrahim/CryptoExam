const adminModel = require('../models/admin-model.js');

const CHECK = async (req, res, next) =>{
    try{
        result = await adminModel.CHECK();
        console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    CHECK
}