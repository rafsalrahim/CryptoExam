const Provider =  require('../../common/provider')
const ExamManagementContract = require('../../contracts/ExamManagement.json')
const provider = new Provider()
const web3 = provider.web3


const REGISTERSTUDENT = async(from, email) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            console.log(ExamManagementContract.networks);
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.registerStudent(email).send({ from: from });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const PROFILE = async(from) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.getProfile().call({ from: from });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const FEEPAYMENT = async(from, feeAmount) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.feePayment().send({ from: from, value: web3.utils.toWei(feeAmount, 'ether') });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const ATTEND = async(from) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.attendExam().call({ from: from });
            resolve({
                result : response
            })
        }catch(err){
            reject(err)
        }
    })
}

const SUBMITEXAM = async(ans) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            let response;
            for(i=0; i<ans.length; i++){
                response = await instance.methods.submitExam(ans[i]).send({ from: accounts[1] });
            }
            resolve({
                result : response
            })
        }catch(err){
            console.log("ERROR",err);
            reject(err)
        }
    })
}

const GENERATERESULT = async(ans) => {
    return new Promise(async (resolve, reject) => {
        try{
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ExamManagementContract.networks[networkId];
            const instance = new web3.eth.Contract(
                ExamManagementContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            const response = await instance.methods.generateResult().send({ from: accounts[1] });
            resolve({
                result : response
            })
        }catch(err){
            console.log("ERROR",err);
            reject(err)
        }
    })
}

module.exports = {
    REGISTERSTUDENT,
    PROFILE,
    FEEPAYMENT,
    ATTEND,
    SUBMITEXAM,
    GENERATERESULT

}