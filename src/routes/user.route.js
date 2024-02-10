const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const {registerRules, loginRules} = require('../middlewares/validators/user.validator');
const {validate} = require('../middlewares/validators/validateData');
const {auth} = require('../middlewares/auth')


router.post('/register', registerRules, validate, userController.register)
router.post('/login', loginRules, validate, userController.login)
router.get('/me', auth, userController.me)

module.exports = router;