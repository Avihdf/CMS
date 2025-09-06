const express = require('express');
const router = express.Router();
const service = require('../models/service');
// const jwtMiddleware=require('../Middleware/jwtmiddleware')



router.get('/Add_service', (req, res) => {
    res.render('addservices', { msg: null, err: null });
});

router.post('/Add_service', async (req, res) => {
    try {
        const { service_name, details, price } = req.body;

        const existservice = await service.findOne({ service_name });
        if (existservice) {
            return res.render('addservices', { msg: null, err: 'Service already Exist' });
        }

        const newservice = new service({ service_name, details, price });
        await newservice.save();
        return res.render('addservices', { msg: 'Service added Successfully', err: null });

    } catch (error) {
        console.log(error.message);
        return res.render('addservices', { msg: null, err: error.message });
    }
});


router.get('/manageservice', async (req, res) => {
    try {
        const servicelist = await service.find();
        res.render('manageservice', { servicelist, err: null,msg:null });
    } catch (err) {
        res.render('manageservice', { servicelist: [], err: err.message,msg:null });
    }
});

router.get('/Add_client', async (req, res) => {
    try {
        const servicelist = await service.find();
        res.render('addclient', { servicelist, error: null,msg:null });
    } catch (err) {
        res.render('addclient', { servicelist: [], error: err.message,msg:null });
    }
});


// router.get('/editservice',(req,res)=>{
//     res.render('editservice')
// })

router.get('/editservice/:id', async (req, res) => {
    try {
        const servicedetail = await service.findById(req.params.id);
        if (!servicedetail) {
            return res.render('manageservice', { servicelist: [], err: "Service not found", msg: null });
        }
        res.render('editservice', { servicedetail, err: null, msg: null });
    } catch (err) {
        res.render('manageservice', { servicelist: [], err: err.message, msg: null });
    }
});

router.post('/editservice/:id', async (req, res) => {
    try {
        const { service_name, details, price } = req.body;
        await service.findByIdAndUpdate(req.params.id, {
            service_name, details, price
        });
        const servicelist = await service.find();
        res.render('manageservice', { servicelist, msg: 'Service updated successfully', err: null });
    } catch (err) {
        const servicelist = await service.find();
        res.render('manageservice', { servicelist, msg: null, err: err.message });
    }
});


router.post('/Delete', async (req, res) => {
    try {
        const serviceId = req.body.id;
        await service.findByIdAndDelete(serviceId);

        const servicelist = await service.find();
        res.render('manageservice', {
            servicelist,
            msg: 'Service Deleted Successfully',
            err: null,
            error: null
        });
    } catch (err) {
        const servicelist = await service.find();
        res.render('manageservice', {
            servicelist,
            msg: null,
            err: err.message,
            error: err.message
        });
    }
});


module.exports = router;