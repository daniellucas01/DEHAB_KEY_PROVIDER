const User = require ("../models/user_model");
const Wallet = require("../models/wallet_model");

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has occured while retrieving users from the server."
            })
        }

        else {
            res.send(data)
        };
    });
};

exports.findById = (req, res) => {
    User.getById(req.params.userId, (err, data) =>{
        if(err) {
            // Handle different error
            // Not found error
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: `User with id ${req.params.userId} is not found.`
                });
            }
            //Other unhandled errors
            else {
                res.status(500).send({
                    message: `Error retrieving user with id ${req.params.userId}.`
                });
            }
        }
        else {
            res.send(data);
        }
    });
};

exports.createNewUser = (req, res) => {

    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        console.log('Object missing');
        res.status(400).send({
            message: "Sent content cannot be EMPTY!"
        });
    }
    
    //Check if username exists 
    const user = new User ({
        username: req.body.username,
        password: req.body.password,
        wallet_id: null
    });
    
    const wallet = new Wallet ({
        address : req.body.wallet_address
    })

    if (user.username && user.password) {
        //Check if username is unique
        console.log("Creating new user")
        User.getByUsername(user.username, (err, data) =>{
            if(err) {
                if (err.kind === "not_found"){
                    console.log("Username is unique")
                    Wallet.create(wallet, (err, data) => {
                        if(err) {
                            res.status(500).send({
                                message: err.message || "Some error occured while creating wallet."
                            });
                        }
                        else {
                            user.wallet_id = data.id 
                            User.create(user, (err, data) => {
                                if(err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occured while creating new user."
                                    });
                                }
                                else {
                                    res.send(data)
                                }
                            });
                        }
                    });
                }
                //Other unhandled errors
                else {
                    res.status(500).send({
                        message: `Error creating user.`
                    });
                }
            }
            else {
                res.status(501).send({
                    message: `A user with the following username already exist, please try again`
                })
            }
        });

    }
    
};