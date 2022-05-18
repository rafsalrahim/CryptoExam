const Provider =  require('../../common/provider')
const ExamManagementContract = require('../../contracts/ExamManagement.json')
const provider = new Provider()
const web3 = provider.web3


const CHECKBAL = async() => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.getBalance().call({ from: accounts[0] });
            resolve({
                result : web3.utils.fromWei(response)
            })
        }catch(err){
            reject(err)
        }
    })
}

const GETSTUDENT = async(data) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.getStudent(data).call({ from: accounts[0] });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    CHECKBAL,
    GETSTUDENT
}