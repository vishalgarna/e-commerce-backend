const { CartModel } = require('../models/cartmodel');
const async = require('async');


async function Addcart(params, callback) {

    if (!params.userid) {
        return callback({
            message: 'Userid is Required'
        })
    }


    try {
        // Searches for an existing cart in the database for the given Userid.
        CartModel.findOne({ userId: params.userid }, async function (err, cartDB) {

            //If there is an error during the search, it returns the error message via the callback.
            if (err) return callback({ message: err })

            else {
                //   If no cart is found (cartDB is null), it creates a new cart.
                if (cartDB === null) {

                    //     Creates a new cart model with the Userid and products from params.
                    const cartModel = new CartModel({
                        userId: params.userid,
                        products: params.products
                    })

                    // Saves the new cart to the database and returns the response via the callback. 
                    //If an error occurs, it returns the error message.
                    await cartModel.save().then((response) => {
                        return callback(null, response)
                    }).catch((error) => {

                        return callback({
                            message: error
                        })
                    });

                }

                //If the existing cart has no products, it updates the cart with the new products and saves it.
                else if (cartDB.products.length == 0) {


                    cartDB.products = params.products;

                    await cartDB.save();

                    return callback(null, cartDB);

                }
                // If the existing cart has products, it iterates over the new products:

                // Checks if the product already exists in the cart (itemindex).

                // If the product is not found, it adds the new product to the cart.

                // If the product is found, it updates the quantity of the existing product.

                // Saves the updated cart after each operation.

                else {

                    // Haan, aapne bilkul sahi samjha! asyncDone callback ka istemal async.eachSeries function ke
                    // context me yahi batata hai ki current iteration complete ho gayi hai aur 
                    // next iteration start ki ja sakti hai. Jab asyncDone call hota hai, to yeh indicate 
                    // karta hai ki current item ka processing complete ho gaya hai aur ab next item ko process kar sakte hain.

                    async.eachSeries(params.products, function (product, asyncDone) {


                        let itemindex = cartDB.products.findIndex(p => p.product == product.product);

                        //   Condition: itemindex === -1 check karta hai ki product array me exist karta hai ya nahi.

                        // Action: Agar product exist nahi karta (itemindex === -1), to:

                        // Push New Product: cartDB.products array me new product add karta hai.

                        // Save Cart: cartDB.save(asyncDone) call karke updated cart ko save karta hai aur asyncDone callback ko call karta hai taaki next product process ho sake.

                        if (itemindex === -1) {
                            cartDB.products.push({
                                product: product.product,
                                qty: product.qty
                            });

                            cartDB.save(asyncDone);
                        }

                        // Condition 1: cartDB.products[itemindex].qty === qty

                        // Action: If the quantity in the cart matches the quantity to be removed, it removes the product from the cart.

                        // Condition 2: cartDB.products[itemindex].qty > qty

                        // Action: If the quantity in the cart is greater than the quantity to be removed, it decreases the quantity by the given qty.

                        // Condition 3: cartDB.products[itemindex].qty < qty

                        // Action: If the quantity in the cart is less than the quantity to be removed, it returns an error message 'enter low Qty'.
                        else {
                            cartDB.products[itemindex].qty = cartDB.products[itemindex].qty + product.qty;
                            cartDB.save(asyncDone)
                        }
                    });
                    //Catches any errors that occur in the try block and returns the error message via the callback.
                    return callback(null, cartDB);
                }

            }

        });

    } catch (error) {

        return callback({
            message: error
        })
    }
}


async function Getcart(params, callback) {

    if (!params.userId) {
        return callback({
            message: 'Plaease enter user id  For Getting Cart details !'
        })
    }

    await CartModel.findOne({ userId: params.userId })
        .populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'Products'

                ,
                populate: {
                    path: 'ProductCategory',
                    model: 'categorie',
                    select: 'categoryName'
                }

            }

        })
        .then((response) => {

            return callback(null, response);
        }).catch((err) => {
            return callback({ message: err });
        })


    // .populate({
    //     path: 'products',
    //     populate: {
    //         path: 'product',
    //         model: 'Product',
    //         select: 'ProductName ProductPrice ProductImage',

    //         populate: {
    //             path: 'Category',
    //             model: 'Category',
    //             select: 'categoryName'
    //         }
    //     }
    // 
}

async function RemoveCart(params, callback) {

    CartModel.findOne({ userId: params.userId }, function (err, cartDB) {

        if (err) return callback({ message: err })

        else {

            if (params.productId && params.qty) {
                const productId = params.productId;
                const qty = params.qty;

                if (cartDB.products.length === 0) {
                    return callback(null, 'CartIs Empty');
                }

                // Purpose: Finds the index of the product in the products 
                // array of cartDB which matches the given productId.
                // Result: If the product is found,
                // itemindex will have the index of the product. If not found, it will be -1.
                else {

                    let itemindex = cartDB.products.findIndex(p => p.product == productId);

                    if (itemindex === -1) {
                        return callback(null, 'Invalid Product');
                    }
                    else {
                        if (cartDB.products[itemindex].qty === qty) {
                            cartDB.products.splice(itemindex, 1);
                        }
                        else if (cartDB.products[itemindex].qty > qty) {
                            cartDB.products[itemindex].qty = cartDB.products[itemindex].qty - qty;
                        }

                        else {
                            return callback(null, { message: 'enter low Qty' });
                        }
                        cartDB.save((err, cartM) => {
                            if (err) return callback(err);

                            return callback(null, {
                                message: 'Cart Update',
                                data: cartM
                            })
                        })
                    }
                }
            }
        }
    });

}

module.exports = {
    Addcart,
    Getcart,
    RemoveCart
}