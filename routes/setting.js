const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwtMiddleware = require('../Middleware/jwtmiddleware')
const user = require('../models/user');



router.get('/setting', jwtMiddleware, (req, res) => {
    res.render('settings', { user: req.user, error: null, msg: null });
});

router.post('/setting', jwtMiddleware, async (req, res) => {
    try {
        const { currentpassword, password, confirmpassword } = req.body;

        const admin = await user.findById(req.user.id);

        // if (!admin) {
        //     return res.render('settings', { user: req.user, error: 'Admin not found', msg: null });
        // }

        const isMatch = await bcrypt.compare(currentpassword, admin.password);
        if (!isMatch) {
            return res.render('settings', { user: req.user, error: 'Current password is incorrect', msg: null });
        }

        if (password !== confirmpassword) {
            return res.render('settings', { user: req.user, error: 'Passwords do not match', msg: null });
        }

        const hash = await bcrypt.hash(password, 10);
        await user.findByIdAndUpdate(req.user.id, { password: hash });

        res.render('settings', { user: req.user, msg: 'Password updated successfully!', error: null });

    } catch (err) {
        res.render('settings', { user: req.user, error: 'Error updating password: ' + err.message, msg: null });
    }
});




// router.post('/setting', async (req, res) => {
//     try {
//         const { currentpassword,password, confirmpassword } = req.body
        
//         const confirmadmin=await user.findOne(currentpassword)

//         if(!confirmadmin){
//             return res.render('settings', { error: 'Current Passwords is wrong'});
//         }
//         else if(password !== confirmpassword) {
//             return res.render('settings', { msg: 'Passwords do not match'});
//         }

//         const hash = await bcrypt.hash(password, 10);

//         await confirmadmin.findByIdAndUpdate({password: hash});
//         res.render('settings', {msg: 'Password updated successfully!' });

//     } catch (err) {
//         res.render('settings', { user: req.user, error: 'Error updating profile: ' + err.message });
//     }

// })


module.exports = router;