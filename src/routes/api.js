const express = require('express');

const router = express.Router();

//----------------------
// API routes
//----------------------
router.get('/', (req, res) => {
    res.json({message: 'Hello api! 🌈🌈'});
});
router.use('/invoices', require('./invoice.route'));

module.exports = router;