const relatedProductServices = require('../services/relatedProductServices')


// add new relsted product in the db
exports.createrelatedproduct = (req, res, next) => {

    const params = {
        product: req.body.product,
        relatedProduct: req.body.relatedProduct
    };

    relatedProductServices.AddRelatedProduct(params, (err, response) => {
        if (err) {
            next(err);
        }
        else {

            res.status(200).send({
                message: 'Success',
                data: response
            })
        }
    })

}

// remoq relate product in the db 

exports.deleteRelatePoduct = (req, res, next) => {

    const params = {
        id: req.params.id
    }
    relatedProductServices.RemoveRelatedProduct(params, (err, response) => {
        if (err) {
            next(err);
        }
        else {

            res.status(200).send({
                message: 'Success',
                data: response
            })
        }
    })

}