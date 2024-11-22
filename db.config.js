const mongoose = require('mongoose');

require('dotenv').config();

// % 401 iska mtlb @ kyukimg mongdb special characte aloowed nahi hai 

url = process.env.DB_URL;



mongoose.set('strictQuery', false);

const db = mongoose.connect(url)
    .then(() => {
        console.log('Databse Conected');

    }).catch((err) => {
        if (err) console.log('Error', err);

    })

module.exports = db;


