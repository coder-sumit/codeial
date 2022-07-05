const express = require('express');
const passport = require('passport');
const router = express.Router();


const usersController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication,usersController.profile);

router.get('/del', usersController.delete);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as middleware to authenticate user
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;