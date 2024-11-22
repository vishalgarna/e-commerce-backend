const mongoose = require('mongoose')


const cards = mongoose.model("CustomerCards", mongoose.Schema({

    cardName: {
        type: String,
        require: true
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    cardExpMonth: {
        type: String,
        required: true
    },

    cardExpYear: {
        type: String,
        required: true
    }
    ,
    cardCVC: {
        type: String,
        required: true
    },

    Customerid: {
        type: String
    },

    cardId: {

        type: String,
        required: true,
    }

}
    , {
        timestamps: true
    }

))

module.exports = cards