const fs = require('fs');
const Provider =  require('../../common/provider')
const ExamManagementContract = require("../../contracts/ExamManagement.json")
const provider = new Provider()
const web3 = provider.web3


const DEPLOY = async(num_qus, q_hash, ans_key, fee) => {
    return new Promise(async (resolve, reject) => {
        try{
            console.log(process.env.MNEMONIC)
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0])
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            let contractHash= "";
            let _newContractInstance = "";
            await instance.deploy({

                data: ExamManagementContract.bytecode,
                arguments: [num_qus, q_hash, ans_key, web3.utils.toWei(fee,"ether")]
            })
            .send({
                from: accounts[0],
                gas: 3000000
            }, function(error, transactionHash){ contractHash = transactionHash })
            .on('error', function(error){ console.log(error) })
            .on('transactionHash', function(transactionHash){ console.log("Transaction Hash",transactionHash) })
            .on('receipt', function(receipt){
               console.log("Contract address", receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', function(confirmationNumber, receipt){  })
            .then(function(newContractInstance){
                _newContractInstance = newContractInstance;
                console.log("Contract address", newContractInstance.options.address) // instance with the new contract address
            });

            //Updating contract address and TX hash json file
            if (ExamManagementContract.networks[networkId] === undefined){
                var new_net = {
                    "events": {},
                    "links": {},
                    "address": "",
                    "transactionHash": ""
                  }
                ExamManagementContract.networks[networkId] = new_net;
                fs.writeFile("./contracts/ExamManagement.json", JSON.stringify(ExamManagementContract, null, 2), function writeJSON(err) {
                    if (err) return console.log(err);
                  });
            }
            ExamManagementContract.networks[networkId].address = _newContractInstance.options.address;
            ExamManagementContract.networks[networkId].transactionHash = contractHash;

            fs.writeFile("./contracts/ExamManagement.json", JSON.stringify(ExamManagementContract, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
              });
            resolve({
                message: "Contract deployed successfully",
                transactionHash: contractHash,
                contractAddress: _newContractInstance.options.address
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    DEPLOY
}