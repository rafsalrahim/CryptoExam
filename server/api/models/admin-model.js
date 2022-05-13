const Provider =  require('../../common/provider')
const SimpleStorageContract = require('../../contracts/SimpleStorage.json')
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
            await instance.methods.set(586).send({ from: accounts[0] });
            var op = "Data set successfully";
            const response = await instance.methods.get().call();
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