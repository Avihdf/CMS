const dotenv=require('dotenv')
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const authroute=require('./routes/auth')
const jwtMiddleware=require('./Middleware/jwtmiddleware')
const service=require('./routes/service')
const search=require('./routes/search')
const setting=require('./routes/setting')
const client=require('./routes/client')


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

// app.get('/', (req, res) => {
//     res.render('home')
// })

app.use('/', authroute)
app.use('/',service)
app.use('/',client)
app.use('/',search)
app.use('/',setting)





app.listen(process.env.PORT, () => {
    console.log(`Server Is Running on http://localhost:${process.env.PORT}`);
})


