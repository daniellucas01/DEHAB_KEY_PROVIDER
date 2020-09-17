const web3 = require ('../ethereum/web3');
const MultiSignatureWallet = require ('../ethereum/build/MultiSignatureWallet.json')

const Contract = function (contract) {
    this.address = contract.address;
}

Contract.signTransactionById = async (contractAddress, transactionId, result) => {
    const instance = new web3.eth.Contract(
        JSON.parse(MultiSignatureWallet.interface),
        contractAddress
    );

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[9]);

    const transaction = await instance.methods.signTransaction(transactionId).send({from : accounts[1], gasPrice: 70000000000, gas: 4300000});
    console.log(transaction);
    
    result(null, transaction);
};

module.exports = Contract;