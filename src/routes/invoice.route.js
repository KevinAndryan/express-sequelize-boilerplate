const express = require('express');
const invoice = require('../controllers/invoice.controller');
const router = express.Router();
const {invoiceRules} = require('../middlewares/validators/invoice.validator');
const {validate} = require('../middlewares/validators/validateData');


router.get('/', invoice.findAll);
router.get('/:id', invoice.findOne);
router.post('/', invoiceRules, validate, invoice.create);
router.put('/:id', invoiceRules, validate, invoice.update);
router.delete('/:id', invoice.delete);

module.exports = router;