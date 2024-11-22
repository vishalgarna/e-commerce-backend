const mongoose = require('mongoose')

const order = mongoose.model('Order', mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    products: [
        {
            product: {

                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true

            },

            amount: {
                type: Number,
                required: true,
            }
            , qty: {
                type: Number,
                required: true

            }


        }
    ],

    grandTotal: {
        type: Number,
        required: true,

    },
    oderStatus: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
    }
}, {
    timestamps: true
}));


module.exports = order;