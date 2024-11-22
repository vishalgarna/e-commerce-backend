const { response } = require('express');
const producUploading = require('../multer/productuploading')
const productservices = require('../services/product.services')


// This controller are create new product
exports.createproduct = (req, res, next) => {

    producUploading(req, res, (err) => {




        if (err) {
            console.log('1---' + err);

            next({
                meassage: err
            });
        }

        else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, '/') : " ";


            const parmams = {
                ProductName: req.body.ProductName,
                ProductCategory: req.body.ProductCategory,
                ProductSku: req.body.ProductSku,
                ProductStatus: req.body.ProductStatus,
                ProductDescribtion: req.body.ProductDescribtion,
                ProductPrice: req.body.ProductPrice,
                ProductImage: path,

            }


            productservices.addProduct(parmams, (err, response) => {
                if (err) {
                    console.log('2---' + err);
                    next({
                        meassage: err
                    });
                }

                else {
                    res.status(200).send({
                        mesage: 'sucess',
                        data: response
                    })
                }
            })


        }


    })
}

// this fun provide all products in db
exports.getProducts = (req, res, next) => {

    const params = {
        page: req.query.page,
        pagesize: req.query.pagesize,
        productIds: req.query.productIds
    }

    productservices.GetProducts(params, (err, response) => {
        if (err) {
            next(err);
        }

        else {
            res.status(200).send({
                meassage: 'sucess',
                data: response
            })
        }
    })

}

// this id giving product on the basis of 

// give product on the basis of categories id
exports.getProductsByCategory = (req, res, next) => {




    const params = {
        id: req.params.id,
        page: req.query.page || process.env.PAGE,
        pagesize: req.query.pagesize || process.env.PAGESIZE

    }

    productservices.GetProductByCategory(params, (err, response) => {
        if (err) {
            next(err)

        }

        res.status(200).send({
            meassage: 'sucess',
            data: response
        })
    })
}

// this  controller is upadate the products 

exports.updateProduct = (req, res, next) => {

    const params = {
        id: req.params.id,
        ProductName: req.body.ProductName,
        ProductCategory: req.body.ProductCategory,
        ProductSku: req.body.ProductSku,
        ProductStatus: req.body.ProductStatus,
        ProductDescribtion: req.body.ProductDescribtion,
        ProductPrice: req.body.ProductPrice,

    }

    productservices.updateProduct(params, (err, response) => {
        if (err) {
            next(err)
        }
        res.status(200).send({
            message: 'sucess',
            data: response
        })
    })

}

// this cont is remove product from the collection base on id 
exports.delteProduct = (req, res, next) => {

    productservices.deleteProduct(req.params.id, (err, response) => {
        if (err) {
            next({ mesage: err })
        }
        else {
            res.status(200).send({
                meassage: 'Product Is Delted',
            })
        }
    })


}


exports.getProductsById = async (req, res, next) => {

    const params = {
        id: req.params.id
    }

    productservices.GetProductById(params, (err, response) => {

        if (err) {
            next({ mesage: err })
        }
        else {
            res.status(200).send({
                meassage: response,
            })
        }
    });




}