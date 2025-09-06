const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const path = require('path');
const jwtMiddleware = require('../Middleware/jwtmiddleware')

const JWT_SECRET = 'your_secret_key';





router.get('/', (req, res) => {
    res.render('login', { error: null })
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const founduser = await user.findOne({ email });
        if (!founduser) {
            return res.render('login', { error: 'Invalid email or password' });
        }


        const isMatch = await bcrypt.compare(password, founduser.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid password' });
        }

        const token = jwt.sign({ id: founduser._id, email: founduser.email, Admin_name: founduser.Admin_name, number: founduser.number }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');

    } catch (err) {
        res.render('login', { error: 'Login error: ' + err.message });
    }


})

router.get('/register', (req, res) => {
    res.render('register', { error: null });
});


router.post('/register', async (req, res) => {
    try {   

        const { name, email, number, password } = req.body;
        console.log(req.body)

        const existingUser = await user.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const hash = await bcrypt.hash(password, 10);
        const newUser = new user({ name, email, number, password: hash });
        await newUser.save();
        res.status(200).json({ msg: 'User Register SucessFully' });
        // res.redirect('/auth/login');

    } catch (err) {

        res.status(500).json({ error:'Internal Server Error'+ err.message });

    }
});


router.get('/dashboard', jwtMiddleware, (req, res) => {
    res.render('dashboard', { user: req.user });
});
router.get('/navbar', jwtMiddleware, (req, res) => {
    res.render('navbar', { user: req.user });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});


module.exports = router;