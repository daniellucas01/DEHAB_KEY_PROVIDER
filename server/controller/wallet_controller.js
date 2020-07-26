const Wallet = require('../models/wallet_model');

exports.createNewWallet = (req, res) => {
    // Error if req is empty
    if (!req.body) {
        res.status(400).send({
            message: "Sent content cannot be EMPTY!"
        })
    }
    
    const wallet = new Wallet({
        address: req.body.wallet_address
    })

    Wallet.createNewWallet(wallet, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating wallet."
            });
        }

        else {
            res.send(data);
        }
    });
};