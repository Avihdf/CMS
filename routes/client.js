const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const jwtMiddleware = require('../Middleware/jwtmiddleware')
const client = require('../models/client')
const service = require('../models/service')

// ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()


router.get('/Add_client', (req, res) => {
    res.render('addclient', { msg: null, error: null });
})
const generate = () => Math.floor(1000000000 + Math.random() * 9000000000).toString()
const bill = () => Math.floor(1000000000 + Math.random() * 9000000000).toString()

router.post('/Add_client', async (req, res) => {
    try {
        const account_number = generate();
        const invoice = bill();
        const now = new Date();

        const { account_type, name, company_name, address, city, state, pincode, email, url, number, password, services } = req.body;

        const existingclient = await client.findOne({ email, number });
        if (existingclient) {
            return res.render('addclient', { error: 'Email or Phone Number Adready exist', msg: null });
        }

        const serviceIds = Array.isArray(services) ? services : [services];
        const selectedServices = await service.find({ _id: { $in: serviceIds } });


        const hash = await bcrypt.hash(password, 10);
        const newClient = new client({ account_number, account_type: account_type, invoice, name, company_name, address, city, state, pincode, email, url, number, password: hash, date: now, services: selectedServices });
        await newClient.save();
        const servicelist = await service.find();
        return res.render('addclient', {servicelist,msg: 'Client Added Successfully', error: null });

    } catch (err) {
        const servicelist = await service.find();
        res.render('addclient', { servicelist, error: err.message,msg: null});
        console.log(err.message);
    }
});


router.get('/Client_List', async (req, res) => {
    try {
        const clientlist = await client.find()
        res.render('viewClient', { clientlist, err: null, msg: null })
    } catch (err) {
        res.render('viewClient', { clientlist: [], err: err.message, msg: null })
    }
})


router.get('/EditClient/:id', async (req, res) => {
    try {
        const clientdetail = await client.findById(req.params.id);
        if (!clientdetail) {
            return res.render('viewClient', { clientlist: [], err: "Client not found", msg: null });
        }
        res.render('editclient', { clientdetail, err: null, msg: null });
    } catch (err) {
        res.render('viewClient', { clientlist: [], err: err.message, msg: null });
    }
});

router.post('/EditClient', async (req, res) => {
    try {
        const { _id, account_type, name, company_name, address, city, state, pincode, email, url, number, password } = req.body;
        const hash = await bcrypt.hash(password, 10)

        await client.findByIdAndUpdate(_id, {
            account_type,
            name,
            company_name,
            address,
            city,
            state,
            pincode,
            email,
            url,
            number,
            password: hash
        });

        const clientlist = await client.find()
        res.render('viewClient', { clientlist, err: null, msg: 'Client Details Updated Successfully' })
    } catch (err) {
        res.render('viewClient', { clientlist: [], err: null, msg: 'Client Details not Updated' + err.message })
    }
});


router.post('/delete/:id', async (req, res) => {
    try {
        const clientdetail = await client.findById(req.params.id);
        await client.findByIdAndDelete(clientdetail._id);
        const clientlist = await client.find();
        res.render('viewClient', { clientlist, msg: 'Client Deleted Successfully', err: null, error: null });
    } catch (err) {
        const clientlist = await client.find();
        res.render('viewClient', { clientlist, msg: null, error: err.message, err: err.message });
    }
});

router.get('/Invoice', async (req, res) => {
    try {
        const clientlist = await client.find()
        res.render('invoice', { clientlist, error: null })
    } catch (err) {
        res.render('invoice', { clientlist: [], error: err.message, msg: null })
    }
})


router.get('/view/:id',async(req,res)=>{
    const clientdetail = await client.findById(req.params.id);
    res.render('viewinvoice',{clientdetail})
})


router.get('/b/w_dates_report', (req, res) => {
    res.render('report', { exstinginvoice: [], msg: null, err: null });
})


router.post('/b/w_dates_report', async (req, res) => {
    try {
        const { fromdate, todate } = req.body;

        const fromDate = new Date(fromdate);
        const toDate = new Date(todate);

        // Ensure toDate includes entire day
        toDate.setHours(23, 59, 59, 999);

        const exstinginvoice = await client.find({date: { $gte: fromDate, $lte: toDate }});

        if (exstinginvoice.length === 0) {
            return res.render('report', {exstinginvoice: [], err: 'No clients found for the given date range.',msg: null});
        }

        res.render('report', {exstinginvoice, err: null, msg: null});

    } catch (err) {
        res.render('report', {exstinginvoice: [],err: err.message,msg: null});
    }
});




module.exports = router;