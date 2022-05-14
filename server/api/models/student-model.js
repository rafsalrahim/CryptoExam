const Provider =  require('../../common/provider')
const SimpleStorageContract = require('../../contracts/ExamManagement.json')
const provider = new Provider()
const web3 = provider.web3


const REGISTERSTUDENT = async(email) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.registerStudent(email).send({ from: accounts[1] });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const PROFILE = async() => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.getProfile().call({ from: accounts[1] });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const FEEPAYMENT = async(feeAmount) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.feePayment().send({ from: accounts[1], value: web3.utils.toWei(feeAmount, 'ether') });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const ATTEND = async() => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.attendExam().call({ from: accounts[1] });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    REGISTERSTUDENT,
    PROFILE,
    FEEPAYMENT,
    ATTEND

}