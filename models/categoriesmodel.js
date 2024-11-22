// db require
require('../config/db.config')

const { transform } = require('async');
// to define structur of categoriesmodel
const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({

    categoryName: {
        type: String,
        unique: true,
        required: true,
    },
    categoryImage: {
        required: true,
        type: String,
    }
},

)

const categorymodel = mongoose.model('categorie', categoriesSchema);

module.exports = categorymodel