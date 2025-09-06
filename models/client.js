const mongoose = require('mongoose');
const client = new mongoose.Schema({
    account_number: String,
    account_type: String,
    invoice: String,
    name: String,
    company_name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    email: { type: String, require: true },
    url: String,
    number: { type: String, require: true },
    password: { type: String, require: true },
    date: { type: Date, default: Date.now },
    services: [
        {
            service_name: String,
            details: String,
            price: Number
        }
    ],
});

module.exports = mongoose.model("Client", client);