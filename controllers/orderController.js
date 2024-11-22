const { response } = require('express');
const orderservice = require('../services/Oreder.service');

exports.create = (req, res, next) => {

    // taking all card datils from ths user 
    // hum user se card deatils le inpur le raha hai 
    var model = {
        userId: req.body.userId,
        card_Name: req.body.card_Name,
        card_Number: req.body.card_Number,
        card_ExpMonth: req.body.cardExpMonth,
        card_ExpYear: req.body.card_ExpYear,
        card_CVC: req.body.card_CVC,
        amount: req.body.amount
    };

    // function ko invoke kar raha hai from orderservice   
    orderservice.createOrder(model, (err, response) => {

        if (err) {
            return next(err);
        }

        else {
            res.status(200).send({
                message: 'succes',
                data: response
            })
        }
    });

}

exports.update = (req, res, next) => {

    orderservice.updateOrder(req.body, (err, results) => {
        if (err) {
            next(err)
        }

        else {

            res.status(200).send({
                message: 'succes',
                data: results
            })
        }
    })
}


exports.getall = (req, res, next) => {

    orderservice.updateOrder(req.user, (err, results) => {
        if (err) {
            next(err)
        }

        else {

            res.status(200).send({
                message: 'succes',
                data: response
            })
        }
    })
}