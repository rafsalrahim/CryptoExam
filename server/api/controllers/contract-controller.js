const contractModel = require('../models/contract-model.js');

const DEPLOY = async (req, res, next) =>{
    try{
        // TODO
        // Generate qus has using IPFS
        let q_hash = "queshashhhhhh"; //need to replace
        let ans_key = [1,2]; // need to change. num_qus = length of ans_key
        let num_qus = 2;
        let fee = "2"; // fee in ether
        result = await contractModel.DEPLOY(req.body.owner, num_qus, q_hash, ans_key, fee);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    DEPLOY
}