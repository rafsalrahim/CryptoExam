const Provider =  require('../../common/provider')
const SimpleStorageContract = require('../../contracts/ExamManagement.json')
const provider = new Provider()
const web3 = provider.web3


const CHECK = async() => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.attendExam().call({ from: accounts[0] });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    CHECK
}