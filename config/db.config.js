const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const db = mongoose.connect('mongodb://localhost:27017/E-comerce',

)
    .then(() => {
        console.log('Databse Conected');

    }).catch((err) => {
        if (err) console.log('Error', err);

    })

module.exports = db;


