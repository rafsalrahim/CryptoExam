var fs = require('fs');
var path = require('path');
const request = require('request');
var { create } = require('ipfs-http-client');
require('dotenv').config()

//Connceting to the ipfs network via infura gateway

const GETHASH = async(file_name) => {
    return new Promise(async (resolve, reject) => {
        try{
            var jsonPath = path.join(__dirname, '..', '..', 'questions', file_name);
            var bodyString = fs.readFileSync(jsonPath, 'utf8');
            const auth = 'Basic ' + Buffer.from("<infura ipfs project id>" + ':' + "< key>").toString('base64');
            const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
                authorization: auth,
            }, })
            const hash = await client.add(bodyString)
            resolve(
                hash
            );
        }catch(err){
            reject(err)
        }
    })
}

//Get file content from IPFS using hash value
const GETFILE = async(q_hash) => {
    return new Promise(async (resolve, reject) => {
        try{
            request('https://ipfs.io/ipfs/'+q_hash, function (error, response, body) {
                if(error){
                    console.error('error:', error); // Print the error if one occurred
                    throw error;
                }
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                if(response.statusCode == 200)
                    body = JSON.parse(body)
                resolve({
                    "body": body,
                    "statusCode": response.statusCode
                });
              });
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    GETHASH,
    GETFILE
}