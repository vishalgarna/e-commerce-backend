// db require
require('../config/db.config')
const mongoose = require('mongoose');



const RelateproductSchema = mongoose.Schema({

    product: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }
    ,
    relatedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
})

module.exports = mongoose.model('RelatedProducts', RelateproductSchema)