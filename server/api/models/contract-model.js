const Provider =  require('../../common/provider')
const SimpleStorageContract = require('../../contracts/ExamManagement.json')
const provider = new Provider()
const web3 = provider.web3


const DEPLOY = async(owner, num_qus, q_hash, ans_key, fee) => {
    return new Promise(async (resolve, reject) => {
        try{
            //const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            console.log("network id",SimpleStorageContract.networks);
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            
            let contractHash;
            let _newContractInstance;
            await instance.deploy({
                data: SimpleStorageContract.bytecode,
                arguments: [num_qus, q_hash, ans_key, web3.utils.toWei(fee,"ether")]
            })
            .send({
                from: owner,
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