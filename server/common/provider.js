const Web3 = require('web3');
require('dotenv').config()
const HDWalletprovider = require('@truffle/hdwallet-provider');

let network = process.env.NETWORK || "ganache"

class Provider {
    constructor(){
        try{
            switch(network){
                case "metamask_local":
                    console.log("Selected network : ", network);
                    this.web3 =  new Web3(new HDWalletprovider(process.env.MNEMONIC,process.env.GANACHE_URL, 0, 10));
                    break;
                case "ropsten":
                    console.log("Selected network : ", network);
                    this.web3 = new Web3(new HDWalletprovider(process.env.MNEMONIC, process.env.ROPSTEN_URL))
                    break;
                case "ganache":
                    console.log("Selected network : ", network);
                    this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_URL));
                    break;
                default:
                    console.log("Selected network default: ", network);
                    this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_URL));
                    break;

                          
            }
        }catch(err){
            console.log("Provider error : ",err);
        }
    }

    
        
}

module.exports = Provider