require('../db.config')

// to define structur of categoriesmodel
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({

    UserName: {
        type: String,
        required: true,

    },

    UserEmail: {
        type: String,
        required: true,

    },

    UserPassword: {
        type: String,
        required: true
    },

    stripeCustomerId: {
        type: String
    }
},
    {

        // ye tranformation ke ;iye kam 
        //aat hai jab resonse bejenge to ye in fiel
        // ko delete ya nam cng kar dega bejte smaya 
        //jab bhi koi isko invoke karega
        toJSON: {
            transform: function (doc, ret) {
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret._v;
                delete ret.UserPassword

            }
        },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('Users', UserSchema);

