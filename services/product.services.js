const { param } = require('moongose/routes/users.js');
const productmodel = require('../models/productmodels.js')

//this is function is create new product 

async function addProduct(params, callback) {

    if (params.ProductImage === " ") {
        callback('Product Image is require ')
    }

    else {

        try {
            const data = productmodel(params)
            const response = await data.save();

            callback(null, response);
        } catch (error) {
            callback(error)
        }

    }


}
// this function is give all product 

async function GetProducts(params, callback) {

    const page = 1 //.page || process.env.PAGE;
    const pagesize = 10//params.pagesize || process.env.PAGESIZE


    // ya pe hume query se agar multiple ids mili hai to wo sirf uni ids ko find
    // karega ya me consition me $in operator ka use kar rahe iska mtlb hai ki 
    // jo ye ids in me hao find karke lao 
    var condition = {};

    if (params.productIds) {
        condition['_id'] = {

            //coming like this 
            // 671f71aa85a02cf722e0c426,671f71d685a02cf722e0c428,671f720285a02cf722e0c42a
            // split methode ids ko aary anake ko unko strin me conver kare , 
            //comma se sepate kar raha hai
            //ex - 
            // [
            //     '671f71aa85a02cf722e0c426',
            //     '671f71d685a02cf722e0c428',
            //     '671f720285a02cf722e0c42a'
            //   ]

            $in: params.productIds.split(',')

        };
    }

    try {
        const response = await productmodel.find(condition)
            .skip((page - 1) * pagesize)
            .limit(pagesize)
            .populate('ProductCategory')  // dusri field ki populate me ye btate hai ki kosni konsi fiels show karni hai 
            .populate('RelatedProducts', 'relatedProduct')

        // this place what i do i am firstly we get 
        //relatedproduct array in response after in array we get relateproduct 
        //object  and reassign with  relateproduct no id and product id 
        // agter send this response
        var res = response.map(r => {
            if (r.RelatedProducts.length > 0) {
                r.RelatedProducts = r.RelatedProducts.map(x => x.relatedProduct)
            }
        })
        callback(null, response)

    }
    catch (e) {
        callback(e)
    }
}

// this fun is give data base on category id 

async function GetProductByCategory(params, callback) {

    const _id = params.id
    const page = 1//params.page
    const pagesize = 10//params.pagesiz
    if (_id === null || _id === '') {
        callback({
            message: 'Please Provide Category Id'
        })
    }

    else {

        try {
            const data = await productmodel.find({ ProductCategory: { _id } })
                .populate('ProductCategory')
                .skip((page - 1) * pagesize)
                .limit(pagesize)
            callback(null, data);
        } catch (error) {
            callback(error)
        }


    }



}

// this function is update the product field

async function updateProduct(params, callback) {

    const _id = params.id

    if (!_id) {
        callback('please provide product Id')
    }

    else {

        try {

            const response = await productmodel.findByIdAndUpdate(_id, params);
            if (!response) {
                callback(`id Not Found ${id}`)
            }

            callback(null, response)

        } catch (error) {
            callback(error)
        }


    }

}

// this function is delete the product from the collection 

async function deleteProduct(id, callback) {



    if (!id) {
        callback('Please Provide CProduct Id')
    }

    try {

        const response = await productmodel.findByIdAndDelete(id)

        if (!response) {
            callback('Id Not Found')
        }

        else {
            callback(null, response)
        }
    } catch (error) {
        callback(error)
    }
}


async function GetProductById(params, callback) {

    const id = params.id;

    try {
        const response = await productmodel.findById(id)

        if (!response) {
            callback('Id Not Found')
        }

        else {
            callback(null, response)
        }

    } catch (error) {
        return callback(error)
    }

}

module.exports = {
    addProduct,
    GetProducts,
    GetProductById,
    GetProductByCategory,
    updateProduct,
    deleteProduct
}