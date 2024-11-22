// // const async = require('async');

// // // Simulating async tasks with setTimeout
// // async.parallel([
// //     function (callback) {
// //         setTimeout(function () {
// //             console.log('Task 1');
// //             callback(null, 'one');
// //         }, 200);
// //     },
// //     function (callback) {
// //         setTimeout(function () {
// //             console.log('Task 2');
// //             callback(null, 'two');
// //         }, 100);
// //     }
// // ],
// //     // Final callback
// //     function (err, results) {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             console.log('All tasks are done.');
// //             console.log(results); // ['one', 'two']
// //         }
// //     });

// //const async = require('async');

// // Simulating async tasks with setTimeout
// // async.waterfall([
// //     function (callback) {
// //         setTimeout(function () {
// //             console.log('Task 1');
// //             callback(null, 'one');
// //         }, 200);
// //     },
// //     function (arg1, callback) {
// //         setTimeout(function () {
// //             console.log('Task 2');
// //             console.log('Received from Task 1:', arg1);
// //             callback(null, 'two');
// //         }, 100);
// //     }
// // ],
// //     // Final callback
// //     function (err, result) {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             console.log('All tasks are done.');
// //             console.log(result); // 'two'
// //         }
// //     });

// // const async = require('async');

// // const items = [1, 2, 3];

// // Simulating async tasks with setTimeout
// // async.each(items, function (item, callback) {
// //     setTimeout(function () {
// //         console.log('Processing item:', item);
// //         callback();
// //     }, 100);
// // }, function (err) {
// //     if (err) {
// //         console.log(err);
// //     } else {
// //         console.log('All items have been processed.');
// //     }
// // });


// // async.each(items, function (item, callback) {

// //     setTimeout(function () {
// //         console.log(items);

// //     }, 1000)
// // });

// const { STRIPE_CONFIG } = require('./config/app.config');

// const stripe = require('stripe')(STRIPE_CONFIG.STRIPE_KEY);
// // async function name() {


// //     try {


// //         const customer = await stripe.customers.create({
// //             name: 'vishal',
// //             email: 'vishalgrna6@gmail.com'
// //         })

// //         console.log(`customer --${JSON.stringify(customer)}`);



// //     } catch (error) {

// //         console.log(`vishal the great and best also  ${error}`);

// //     }

// // }


// // name();

// const cardnumber = "4000003560000008"
// async function addCard() {

//     try {


//         // const token = await stripe.tokens.create({

//         //     number: "4242424242424242", // Test card number
//         //     exp_month: "12",
//         //     exp_year: '2023',
//         //     cvc: '123',

//         // });
//         const card_token = await stripe.tokens.create({
//             card: {
//                 name: "vishal",
//                 number: "4242 4242 4242 4242",
//                 exp_month: "12",
//                 exp_year: "2034",
//                 cvc: "567"
//             }
//         });

//         console.log(`from card_token - ${card_token} `);

//         const card = await stripe.customers.createSource('cus_RBZDLXXN2RBhCZ', {
//             source: `${card_token}`
//         })

//         console.log(`from add cart - ${card} `);

//         // return callback(null,
//         //     { card: card.id }
//         // )


//     } catch (error) {

//         console.log(`vishal the great and best also ${error}`);



//     }
// }

// addCard()



let i = 0;
while (true) {
    console.log(`good mornigg`);

}