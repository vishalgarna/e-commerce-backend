const express = require('express');
const path = require('path')
const app = express();
const errHandling = require('./errorhandling/error'); // Import your error handler
const router = require('./routes/routes')

const { validToken } = require('./errorhandling/auth');
const _publicpath = path.join(__dirname, 'views');


// static xontent use in app ;
app.use(express.static(_publicpath));


app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use('/uploads/products', express.static('uploads/products/'))
app.use('/uploads/categories', express.static('uploads/categories/'))
app.use('/uploads/slider', express.static('uploads/slider/'))
// Your routes here...
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Catch-all route to handle 404 errors
app.all('*', (req, res, next) => {

    console.log(req.query);
    next({
        status: 404,
        message: ' tumne galat roue=te pe clicke kia=ya hai'
    });
});

//  middlewares
app.use(errHandling);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`MAke a Historyrt ${PORT}`);
});
