const express = require('express');

const router = express.Router();

//----------------------
// API routes
//----------------------
router.get('/', (req, res) => {
    res.json({message: 'Hello api! 🌈🌈'});
});
router.use('/invoices', require('./invoice.route'));
router.use('/users', require('./user.route'));

module.exports = router;