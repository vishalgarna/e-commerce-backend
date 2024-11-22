
const cardsModel = require('../models/cards.model')
const orderModel = require('../models/order.model')
const usermodel = require('../models/userModel')

const stripeservices = require('../services/Stripe.services');
const cartservices = require('../services/CartServices');
const { response } = require('express');
const order = require('../models/order.model');
const { populate } = require('moongose/models/user_model');
const { select } = require('async');




async function createOrder(params, callback) {


    // step 1: check karege ki usermodel me kya ye id persent hai 

    // find one me first argument konsi fiel find karni hai second callback
    // return karega jisme 1 is err and 2 is data ko hoga 
    usermodel.findOne({ _id: params.userId }, async (err, userDB) => {

        // chcke karte samay koi error aa jatai hai to erros bejo  callback me 
        if (err) {
            return callback({
                message: err
            })
        }

        // me result milta hai hum ab dekte hai wow null ye data 
        else {

            // empty model create kiya to storing some valuse muje bhi nahi pata aage pata karte hai 
            var model = {};

            // agar usermodel me stripe cutomer id persent nahi hai to ye utha patak karo kyakakro chaliye dekte hai .....
            // nayi stripid bano using of stipe crete method aur serivcers 
            if (!userDB.stripeCustomerId) {

                // striperservice ke createcustome ko call karo necessary field sent karo asur customer 
                //creste karo ye hum ek id retrun karga jo ki custome id  aur uske baar me sabkuch hogi thik hai 
                await stripeservices.createCustomer({
                    "name": userDB.UserName,
                    "email": userDB.UserEmail,

                }, (err, results) => {

                    if (err) {
                        return callback({ message: err })
                    }
                    // customer ki ramkatha aane ke baad 
                    if (results) {

                        // hum usermodel me ek nayi field ka avishakar karenge 
                        //jo ki strirpecustomer id ke nam se jani jaeghi  aur wow id result se lenge 
                        //aur userdb me save krenge 
                        userDB.stripeCustomerId = results.id,
                            userDB.save();
                        // aur model me bhi store kar lenge kyu karenge aagae dekta hai..
                        model.stripeCustomerId = results.id

                    }
                })
            }

            // agar tume stripecustomerid mil jaati hai to ye karo 
            // empty model me usi ke nam ki field banake us id ko store ka lo 
            else {

                // store kar li 
                model.stripeCustomerId = userDB.stripeCustomerId;
            }

            // uske baad tum karo 
            // cardmodel me find karo customer id [jo hume stripeid mili hai rahegi wow hi customer id rehigi ]

            // cardmodel me tum custid , cardno , carexmonth , carexpyear ye find karo baad sdekte kya karnah ai inka 

            cardsModel.findOne({
                customerId: model.stripeCustomerId,
                cardNumber: params.cardNumber,
                cardExpMonth: params.card_ExpMonth,
                cardExpYear: params.card_ExpYear
            },

                // cardb find kar ek document return karegga 
                async function (err, cardDB) {
                    if (err) {
                        return callback({ message: err })
                    }

                    else {

                        // agar tumhe carddb me ye sab nahi
                        // milta jo abhi hume upar find karvaye tha 

                        // to tum kya karo to tum karo new card documnet  create karo stripservice ki add car fun ki madad se 
                        // new card add karo on stripe gatewy samje babu
                        // phir wow tumhw uss information convert karkre ek toekn dega 
                        if (!cardDB) {

                            await stripeservices.addCard({
                                card: {
                                    "card_Name": params.card_Name,
                                    "card_Number": params.card_Number,
                                    "card_ExpMonth": params.card_ExpMonth,
                                    "card_ExpYear": params.card_ExpYear,
                                    "card_CVC": params.card_CVC,
                                    "customer_Id": model.stripeCustomerId
                                }
                            }, async (err, results) => {
                                if (err) {
                                    return callback({
                                        meassage: err
                                    })
                                }

                                // phir us token ko tume apne card db me save kar lena 
                                // cardid ke nam se agle baar us user ka hum wow token istmal kar lenge for payment 
                                // easy and simple 
                                if (response) {
                                    const card = new cardsModel({
                                        cardId: results.card,
                                        cardName: params.card_Name,
                                        cardNumber: params.card_Number,
                                        cardExpMonth: params.card_ExpMonth,
                                        cardExpYear: params.card_ExpYear,
                                        cardCVC: params.card_CVC,
                                        customerId: model.stripeCustomerID
                                    })

                                    // usss card model ko save kar denge db me 
                                    await card.save();

                                    // aur suno kha chale ja raho puri baat to suno janab ... 
                                    // moel me ye card token store kar lena for return 
                                    model.cardId = results.card;
                                }
                            })
                        }

                        // tumhare pass already card id yani ye uer pahle bhi payment kar chuka aur iske basse 
                        // stripe id hai carid on stripe gateway 
                        else {
                            model.cardId = cardDB.cardId
                        }

                        // uske baad tumhare passs  customer_id hai and card_id hogi to tum ye karo 
                        // strip service ki madat se tume genreatepayment_INtent pe jao 
                        // paymnet karwane ke liye user ki custoid , carid jo stripe ne di thi necssry hai 
                        await stripeservices.generatePaymentIntent({
                            "receipt_email": userDB.email,
                            "amount": params.amount,
                            "card_id": model.cardId,
                            "customer_id": model.stripeCustomerId,

                        },
                            (err, result) => {

                                if (err) {
                                    return callback({
                                        meassage: err
                                    })
                                }

                                if (result) {

                                    // payment hone ke baad payment intne id genrste hogi  jise hum apne moel me store karlenge 

                                    model.paymentIntenId = results.id,
                                        model.client_secret = results.client_secret
                                }
                            }
                        );

                        // uske baad stripe ka mamla ktm 
                        //cartservice me get cart kareng kyu ksrenge uska pata nahi chala abhi tak 
                        // 

                        cartservices.Getcart({ userId: userDB.userId }, (err, cartDB) => {
                            if (err) {
                                return callback({
                                    meassage: err
                                })
                            }
                            else {


                                // kya cartDb empty nahi nahi hai to kya kare
                                if (cartDB) {

                                    // do object banaye par kyu 
                                    var products = {};

                                    var grandTotal = 0;


                                    // products  array me se ek ek product niaklenge arr naye products object  me assign karenge 
                                    // uske andar hum product , qty , amount tteno ek sath karenge dalemge 
                                    // aur sath sath har product ki price ka bhi total karte jayenge and store karenge grandtotal me 

                                    cartDB.products.forEach(product => {
                                        products.push({
                                            product: product.product._id,
                                            qty: product.qty,
                                            amount: product.product.ProductPrice
                                        });
                                        grandTotal += product.product.ProductPrice

                                    });

                                    // phir new order create karenge or order db me save karenge aur with user id

                                    const neworder = new orderModel({
                                        userId: cartDB.userId,
                                        products: products,
                                        orderStatus: "pending",
                                        grandTotal: grandTotal
                                    });

                                    // order db me save new order 
                                    neworder.save().then((response) => {
                                        model.orderId = response._id;
                                        return callback(null, model);
                                    }).catch((err) => { return callback(error) })
                                }
                            }
                        })
                    }
                }
            )
        }


    })
}

// 1. pahle stripe pe customer register karvsyege if dont register 
// 2. customer ki card details stripe par provide karege jsis wow hume ek token deka if not register 
// 3. payment indent karvaenge ye payment id dega 
// 4.user ki id se getcart karenge uske saare products get karenge aur new order create karenge 
// 5.uske baad new order create karenge usme total product price hogi 
// *********** after this steps new order created ********************* 

async function updateOrder(params, callback) {

    var model = {

        orderStatus: params.status,
        transactionId: params.transaction_id,
        orderId: params.orderId
    }


    orderModel.findByIdAndUpdate(params.userId, model, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                return callback({ meassage: 'Order Update Failed' });
            }

            else {
                if (params.status == "success") {
                    // clear the cart
                }
                return callback(null, response)
            }
        }).catch((error) => {
            return callback({
                meassage: err
            })

        })
}

async function getOrders(params, callback) {

    order.findOne({ userId: params.userId })
        .populate({
            path: "products",
            populate: {
                path: "product",
                model: 'Product',
                populate: {
                    path: 'ProductCategory',
                    model: 'category',
                    select: "categoYName",
                }
            }

        }).then((response) => {
            return callback(null, response);
        }).catch((err) => {
            return callback({
                meassage: err
            })
        })

}
module.exports = {

    createOrder,
    updateOrder,
    getOrders

}