const router = require('express').Router();
const categoriescontroller = require('../controllers/categorycontrollers')


// categories routes

router.post('/category-create', categoriescontroller.createCategory);

module.exports = router;