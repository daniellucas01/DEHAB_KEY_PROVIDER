const mySql = require ("../database");

const Wallet = function(wallet) {
    // Wallet Id is auto generated by the database
    this.address= wallet.address;
}

Wallet.create =  (newWallet , result)  => {
    console.log (newWallet);
    mySql.query(`INSERT INTO user_wallet(wallet_address) VALUES (${newWallet.address})` , (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        console.log("Wallet Contract Saved", {id : res.insertId, newWallet});
        result(null, {id : res.insertId, newWallet});
    });
};

module.exports = Wallet;