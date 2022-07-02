const express = require('express');
const router = express.Router();


const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.get('/del', usersController.delete);

module.exports = router;