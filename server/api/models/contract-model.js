const Provider =  require('../../common/provider')
const SimpleStorageContract = require('../../contracts/ExamManagement.json')
const provider = new Provider()
const web3 = provider.web3


const DEPLOY = async() => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            
            let contractHash;
            await instance.deploy({
                data: SimpleStorageContract.bytecode,
                arguments: [2, "ggghhhhh", [1, 3], 2]
            })
            .send({
                from: accounts[0],
                gas: 3000000
            }, function(error, transactionHash){ contractHash = transactionHash })
            .on('error', function(error){ console.log(error) })
            .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
            .on('receipt', function(receipt){
               console.log(receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', function(confirmationNumber, receipt){ console.log(receipt) })
            .then(function(newContractInstance){
                console.log(newContractInstance.options.address) // instance with the new contract address
            });
            resolve({
                message: "Contract deployed successfully",
                result : contractHash
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    DEPLOY
}