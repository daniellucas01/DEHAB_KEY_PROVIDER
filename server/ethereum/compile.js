const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//Delete the whole build folder
//To make sure that the abi JSON file will not fail since an existing file exist later on..
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'MultiSignatureWallet.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const output = solc.compile(source, 1).contracts;
//Make sure the build folder exist, if not create the folder
fs.ensureDirSync(buildPath);
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}

