const { check } = require('express-validator');

const invoiceRules = [
  check('name')
    .notEmpty()
    .withMessage('Name is required'),
  check('date')
      .notEmpty()
      .withMessage('date is required'),
  check('amount')
      .notEmpty()
      .withMessage('amount is required'),

];

exports.invoiceRules = invoiceRules;