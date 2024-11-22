// require all necessary controllers 
const router = require('express').Router();
const categoriescontroller = require('../controllers/categorycontrollers');
const productcontroller = require('../controllers/productControllers');
const usercontroller = require('../controllers/userController');
const relatedProductcontroller = require('../controllers/relatedproductcontroller');
const slidercontroller = require('../controllers/slidercontroller');
const cartrcontrollers = require('../controllers/cartcontrollers');
const ordercontroller = require('../controllers/orderController')

// user authentication before processing routes
const { validToken } = require('../errorhandling/auth');

// categories routes
router.post('/category-create', categoriescontroller.createCategory);
router.get('/categories/:id', categoriescontroller.getCategoryById);
router.get('/categories', categoriescontroller.AllCategory);
router.put('/categories/:id', categoriescontroller.UpdateCategory); // Fixed path consistency
router.delete('/categories/:id', categoriescontroller.deletCategory); // Fixed spelling

// product routes
router.post('/product-create', productcontroller.createproduct); // Capitalize for consistency
router.get('/products', productcontroller.getProducts);
router.get('/product/:id', productcontroller.getProductsByCategory); // Modified for clarity
router.get('/product/:id', productcontroller.getProductsById);
router.put('/product/:id', productcontroller.updateProduct);
router.delete('/product/:id', productcontroller.delteProduct); // Fixed spelling

// slider routes
router.post('/slider', slidercontroller.addslider); // Capitalize for consistency
router.get('/slider', slidercontroller.getslider);

// user routes
router.post('/register', usercontroller.createUser);
router.post('/login', usercontroller.loginuser);
router.get('/users', usercontroller.getAllusers)

// related-product routes 
router.post('/related-product', relatedProductcontroller.createrelatedproduct); // Capitalize for consistency
router.delete('/related-product/:id', relatedProductcontroller.deleteRelatePoduct); // Fixed spelling

// cart routes
router.get('/carts', cartrcontrollers.GetallCart);
router.post('/carts', cartrcontrollers.createCart); // Fixed spelling and consistency
// router.get('/carts', validToken, cartrcontrollers.GetallCart); // Standardize naming
router.delete('/carts', cartrcontrollers.RemoceCartitems); // Uncomment if delete functionality is needed

// order routes
router.get('/order', ordercontroller.getall);
router.post('/order', ordercontroller.create)
//router.post('/order', validToken, ordercontroller.create)
router.put('/order', ordercontroller.update);


module.exports = router;
