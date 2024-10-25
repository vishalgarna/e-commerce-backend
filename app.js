const express = require('express');
const path = require('path')
const app = express();
const errHandling = require('./errorhandling/error'); // Import your error handler
const router = require('./routes/routes')


const _publicpath = path.join(__dirname, 'views');

// static xontent use in app ;

app.use(express.static(_publicpath));
app.use(router);

// ya ye hum bta rahe ki images static 
app.use('/upload/categories', express.static('uploads/categories'));

// Your routes here...
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Catch-all route to handle 404 errors
app.all('*', (req, res, next) => {
    const err = {
        status: 404
    };
    next(err);
});

//  middlewares
app.use(errHandling);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
