
const { STRIPE_CONFIG } = require('../config/app.config')
const stripe = require('stripe')(STRIPE_CONFIG.STRIPE_KEY)

// creater customer on stripe  an treutn customer id 
async function createCustomer(params, callback) {

    try {

        const customer = await stripe.customers.create({
            name: params.name,
            email: params.email
        })

        // ye customer ki rmakatha retuir nkarega useme name , emai, aur id hogi tik hai 
        return callback(null, customer)

    } catch (error) {

        return callback({
            message: error
        })
    }
}

async function addCard(params, callback) {

    try {

        // const card_token = await stripe.tokens.create({
        // card: {
        //     name: params.card_Name,
        //     number: params.card_Number,
        //     exp_month: params.card_ExpMonth,
        //     exp_year: params.card_ExpYear,
        //     cvc: params.card_CVC
        // }

        const card_token = await stripe.tokens.create({
            card: {
                // name: params.card_Name,
                number: params.card_Number,
                exp_month: params.card_ExpMonth,
                exp_year: params.card_ExpYear,
                cvc: params.card_CVC
            },
        })


        console.log(`from add cart - ${card_token} `);

        const card = await stripe.customers.createSource(params.customer_ID, {
            source: `${card_token}`
        })

        console.log(`from add cart - ${card} `);

        return callback(null,
            { card: card.id }
        )


    } catch (error) {
        return callback({
            message: error
        })

    }
}

async function generatePaymentIntent(params, callback) {

    try {


        const createPayamentIndent = await stripe.paymentIntents.create({
            recipt_email: params.receipt_email,
            // * 100 mulitply isliye karte kyuki humare amount decimal me jaate hai 
            // ex 100 to decimal me jayenge .100 to isko shai karne ke liye uske karte hai 
            amount: params.amount * 100,
            currency: STRIPE_CONFIG.CURRENCY,
            payment_method_types: ['card']
        });
        console.log(`from createPayamentIndent - ${createPayamentIndent} `);
        callback(null, createPayamentIndent);


    } catch (error) {
        return callback({
            message: error
        })

    }


}


module.exports = {
    generatePaymentIntent,
    addCard,
    createCustomer
}