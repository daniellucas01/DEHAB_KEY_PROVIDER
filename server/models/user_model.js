const mySql = require ("../database");

const User = function(user) {
    this.username= user.username;
    this.password = user.password;
    this.wallet_id = user.wallet_id;
}

User.create =  (newUser, result)  => {
    mySql.query(`INSERT INTO user_table (username, password, wallet_id) VALUES ( '${newUser.username}' , '${newUser.password}' , ${newUser.wallet_id} )`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        console.log("created user", {id : res.insertId, newUser});
        result(null, {id : res.insertId, newUser});
    });
};

User.getAll = result => {
    mySql.query("SELECT * FROM user_table" , (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};


User.getById = (userId, result) => {
    mySql.query(`SELECT * FROM user_table WHERE user_id = '${userId}'`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        // If there is user by that ID
        if (res.length) { // Meaning that if there is result of the user with the ID
            console.log("User found!, User: ", res[0]);
            result (null, res[0]);
            return;
        }

        //No user by that id
        result({kind: "not_found"}, null);
    });
};

User.findUserWalletWithUserID = (userId, result) => {
    mySql.query(`SELECT us.user_id, uw.wallet_address FROM user_table us INNER JOIN user_wallet uw on us.wallet_id = uw.wallet_id WHERE us.user_id = ${userId}`,
    (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        // If there is user by that ID
        if (res.length) { // Meaning that if there is result of the user with the ID
            console.log("Wallet found!, Wallet: ", res[0]);
            result (null, res[0]);
            return;
        }

        //No user by that id
        result({kind: "not_found"}, null);
    });
};

User.getByUsername = (username, result) => {
    console.log("getting username");
    mySql.query(`SELECT * FROM user_table WHERE username = '${username}'`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        
        // If there is user by that ID
        if (res.length) { // Meaning that if there is result of the user with the ID
            console.log("User found!, User: ", res[0]);
            result (null, res[0]);
            return;
        }

        //No user by that id
        result({kind: "not_found"}, null);
    });
};

module.exports = User;