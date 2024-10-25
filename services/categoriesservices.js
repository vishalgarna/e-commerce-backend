// db require
require('../config/db.config')

// categorieschema file uploading
const categoriesSchema = require('../models/categoriesmodel')



// this dunction is adding new category in db 
const AddCategories = async (params, callback) => {

    if (!params.categoryName) {
        callback({ message: 'Please enter categoryName' })
    }

    else if (params.categoryImage === " ") {
        callback({ message: 'Please choose  CategoryImage' })
    }

    else {
        try {
            const data = new categoriesSchema(params)
            const response = await data.save()
            return callback('', response);
        } catch (error) {

            callback({ message: error });
        }
    }
}


//this fun rturn all the categories 

async function getCategories(params, callback) {

    const page = params.page || process.env.PAGE
    const pagesize = params.pagesize || process.env.PAGESIZE





}

module.exports = {
    AddCategories
}
