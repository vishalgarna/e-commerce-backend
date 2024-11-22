require('../db.config')

// to define structur of categoriesmodel
const mongoose = require('mongoose');


const SliderSchema = mongoose.Schema({

    SliderName: String,
    SliderImage: String

})

module.exports = mongoose.model('Slider', SliderSchema);