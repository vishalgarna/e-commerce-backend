const { response } = require('express');
const productmodel = require('../models/productmodels.js')
const relatedproductmodel = require('../models/relatedProductmodel.js')


async function AddRelatedProduct(params, callback) {
    if (!params.product) {
        return callback({
            message: 'Product Id is Required'
        });
    }

    if (!params.relatedProduct) {
        return callback({
            message: 'Related Product Id is Required'
        });
    }

    try {
        const newRelatedproduct = new relatedproductmodel(params);
        await newRelatedproduct.save().then(async (response) => {

            await productmodel.findOneAndUpdate(
                { _id: params.product },

                {
                    $addToSet: {
                        RelatedProducts: response // Use response._id to ensure the correct ID is added
                    }
                },
                { new: true } // Return the updated document
            );

            return callback(null, response);
        });




    } catch (error) {
        return callback({
            message: error.message // Ensure the error message is clear
        });
    }
}


async function RemoveRelatedProduct(params, callback) {

    const id = params.id
    if (!id) {

        return callback({
            message: 'Product Id is Required'
        });
    }

    relatedproductmodel.findByIdAndDelete(id).then((response) => {
        if (!response) {
            return callback({
                message: 'Product Id is Not Found'
            });
        }

        else {

            return callback(null, response)
        }
    }).catch((err) => {

        return callback({
            message: error
        });
    })

}

module.exports = {
    AddRelatedProduct,
    RemoveRelatedProduct
}
