const Web3 = require('web3');

// let web3 = new Web3(
//     new Web3.providers.HttpProvider('HTTP://192.168.0.109:7545')
// );

let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("Using existing web3 provider");
}
else {
    web3 = new Web3(
        new Web3.providers.HttpProvider('HTTP://192.168.0.109:7545')
    );
    console.log("Creating new web3 provider");
} 



// async function initweb3(){
//     try {
//         if (typeof web3 !== 'undefined') {
//             web3 = await new Web3(web3.currentProvider);
//             console.log("inside if");
//         } 
//         else {
//             web3 = await new Web3(new Web3.providers.HttpProvider("HTTP://192.168.0.109:7545"));
//             console.log("inside else");
//         }
//         console.log(web3.eth.getAccounts().then(console.log));    
//     }
//     catch(err) {
//         console.log(err);
//     }
    
// }

// initweb3();


module.exports = web3;