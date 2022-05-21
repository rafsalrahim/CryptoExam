const contractModel = require('../models/contract-model.js');
const ipfsModel = require('../models/ipfs-model.js');

const DEPLOY = async (req, res, next) =>{
    console.log(req.body);
    try{
        
        // Place question paper json file inside ./server/questions folder
        ipfs_hash = await ipfsModel.GETHASH(req.body.file_name);
        let q_hash = ipfs_hash['path'] || "defaultmyexamhashvaluehere"; //need to replace
        let ans_key = req.body.ans_key; // need to change. num_qus = length of ans_key
        let num_qus = req.body.num_qus;
        let fee = req.body.exam_fee; // fee in ether
        result = await contractModel.DEPLOY(num_qus, q_hash, ans_key, fee);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    DEPLOY
}