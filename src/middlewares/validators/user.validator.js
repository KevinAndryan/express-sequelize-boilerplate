const {check} = require('express-validator');


const registerRules = [
  check('username')
    .notEmpty()
    .withMessage('Username is required'),

  check('password')
    .notEmpty()
    .withMessage('Password is required'),

  check('name')
    .notEmpty()
    .withMessage('Name is required'),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  check('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone format'),
];



exports.registerRules = registerRules;


const loginRules = [
  check('username')
    .notEmpty()
    .withMessage('Username is required'),

  check('password')
    .notEmpty()
    .withMessage('Password is required'),
];


exports.loginRules = loginRules;