const express = require('express');
const users = require("../controller/user_controller");
const contract = require("../controller/contract_controller");
const router = express.Router();

router.get('/', users.findAll);
router.post('/', users.createNewUser);
router.get('/authenticate/:username/:password', users.authenticateUser);
router.get('/:userId', users.findById);
router.get('/wallet/:userId', users.getUsersWallet);
router.post('/sign', contract.signTranscationInContract);

module.exports = router;