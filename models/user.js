const mongoose = require('mongoose')
const user = new mongoose.Schema({

     name: String,
     email: { type: String, require: true, unique: true },
     number: { type: String, require: true, unique: true },
     password: { type: String, require: true },
});

module.exports = mongoose.model("Admin", user);