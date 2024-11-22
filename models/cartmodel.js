require('../config/db.config')
// to define structur of categoriesmodel
const mongoose = require('mongoose');


const CartModel = mongoose.model('Cart', mongoose.Schema({

    userId: {

        type: String,
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },

            qty: {
                type: Number,
                required: true
            }
        }
    ]

}, {
    toJSON: {
        transform: function (model, ret) {

            ret.cartId = ret._id.toString(),
                delete ret._id;
            delete ret._v;
        }
    }
}

));


module.exports = {
    CartModel
}