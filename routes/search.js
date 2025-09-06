const express = require('express');
const router = express.Router();
const client = require('../models/client')


router.get('/Search_invoices', (req, res) => {
    res.render('search', { existinginvoice: [], msg: null, error: null });
});

router.post('/Search_invoices', async (req, res) => {
    try {
        const { invoice } = req.body;

        const existinginvoice = await client.find({ invoice });
        if (existinginvoice.length === 0) {
            return res.render('search', { existinginvoice: [], error: 'Invoice not available', msg: null });
        }

        res.render('search', { existinginvoice, error: null, msg: null });
    } catch (err) {
        res.render('search', { existinginvoice: [], error: err.message, msg: null });
    }
});



module.exports = router;