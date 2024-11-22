require('../config/db.config');
const mongoose = require('mongoose');

// to define structure of Productmodel
const ProductSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
    },
    ProductCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie',
        required: true,
    },
    ProductImage: {
        required: true,
        type: String,
    },
    ProductSku: {
        type: String,
        required: true,
    },
    ProductStatus: {
        type: String,
        required: true,
    },
    ProductDescribtion: {
        type: String,
    },
    ProductPrice: {
        type: Number,
    },
    RelatedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RelatedProducts'
    }]

});

const productmodel = mongoose.model('Products', ProductSchema);

module.exports = productmodel;
