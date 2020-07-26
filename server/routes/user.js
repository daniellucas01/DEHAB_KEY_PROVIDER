const express = require('express');
const users = require("../controller/user_controller");
const router = express.Router();

router.get('/', users.findAll);
router.post('/', users.createNewUser);
router.get('/:userId', users.findById);

router.get('/:userId', (req, res, next) =>{
    const id = req.params.userId;
});

module.exports = router;