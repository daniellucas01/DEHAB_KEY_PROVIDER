const Contract = require ("../models/contract_model");

exports.signTranscationInContract = (req, res) => {
    console.log('Start Signing');
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        console.log('Object missing');
        res.status(400).send({
            message: "Sent content cannot be EMPTY!"
        });
        return;
    };  
    console.log('Initiating contract address');
    const contract = new Contract({
        address: req.body.contract_address
    })
    console.log(req.body.contract_address);
    Contract.signTransactionById(contract.address, req.body.transactionId, (err, data) =>{
        if(err) {
            // Handle different error
            // Not found error
            res.status(500).send({
                message: `Error signing transaction`
            });
        }
        else {
            res.send(data);
        }
    });
};

