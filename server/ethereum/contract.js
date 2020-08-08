const web3 = require ('./web3');
const MultiSignatureWallet = require ('./build/MultiSignatureWallet.json')

const instance = new web3.eth.Contract(
    JSON.parse(MultiSignatureWallet.interface),
    '0x3399289ce3C2197f5b16736aB238703E0Ea80d9B'
);

const testing = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[9]);

    const result = await instance.methods.signTransaction().send({from : accounts[1], gasPrice: 70000000000, gas: 4300000});
    console.log(result);
};

testing();



module.exports = instance;

