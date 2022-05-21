var fs = require('fs');
var path = require('path');
var { create } = require('ipfs-http-client');
require('dotenv').config()

//Connceting to the ipfs network via infura gateway

const GETHASH = async(file_name) => {
    // console.log(process.env.INFURA_PROJECT_ID);
    // console.log(process.env.INFURA_PROJECT_SECRET);
    const projectId = process.env.INFURA_PROJECT_ID;
    const projectSecret = process.env.INFURA_PROJECT_SECRET;
    return new Promise(async (resolve, reject) => {
        try{
            const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
            var jsonPath = path.join(__dirname, '..', '..', 'questions', file_name);
            var bodyString = fs.readFileSync(jsonPath, 'utf8');

            const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
            const hash = await client.add(bodyString)
            resolve(
                hash
            );
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    GETHASH
}