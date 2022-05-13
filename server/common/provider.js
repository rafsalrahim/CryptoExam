const Web3 = require('web3');
require('dotenv').config()
const HDWalletprovider = require('@truffle/hdwallet-provider');

let network = process.env.NETWORK || "ganache"

class Provider {
    constructor(){
        try{
            let METAMASK = async() =>{
                console.log("Selected network11 : ", network);
                console.log("Amal",window.ethereum);
                if (window.ethereum) {
                    this.web3 = new Web3(window.ethereum);
                    try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    } catch (error) {
                        console,log("Metamask not available in browser",error);
                    }
                }
            }
            switch(network){
                // case "metamask":
                //     METAMASK(); 
                //     break;
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