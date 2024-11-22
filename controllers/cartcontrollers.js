const cartService = require('../services/CartServices')

exports.createCart = (req, res, next) => {

    var model = {

        userid: req.headers.userid,
        products: req.body.products
    }

    cartService.Addcart(model, (err, results) => {

        if (err) {
            next(err)
        }
        else {
            return res.status(200).send({
                message: 'sucees',
                data: results
            })
        }
    })

}


exports.GetallCart = (req, res, next) => {

    var model = {
        userId: req.headers.userid
        // : req.query.userId,
        // userId: "6727b27d1261135d0e17c733"
    }

    // console.log(req.headers);

    cartService.Getcart(model, (err, results) => {

        if (err) {
            next(err)
        }
        else {
            return res.status(200).send({
                message: 'sucees',
                data: results
            })
        }
    })

}


exports.RemoceCartitems = (req, res, next) => {
    var model = {

        userId: req.headers.userid,
        productId: req.body.productId,
        qty: req.body.qty
    }
    cartService.RemoveCart(model, (err, results) => {

        if (err) {
            next(err)
        }
        else {

            return res.status(200).send({
                message: 'sucees',
                data: results
            })
        }
    })

}