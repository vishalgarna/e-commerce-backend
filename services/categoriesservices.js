// db require
require('../config/db.config')

const { countDocuments } = require('moongose/models/user_model')
const categorymodel = require('../models/categoriesmodel')
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

    // find total docs in db
    const totalCatDb = await categorymodel.countDocuments;
    // find how many page are created total cat
    const totalpage = Math.ceil(totalCatDb / pagesize)

    if (page > totalpage) {
        return callback({
            message: 'Page Not Found'
        })
    }
    else {
        try {

            const response = await categorymodel.find()
                .skip((page - 1) - pagesize)
                .limit(pagesize);

            return callback(null, response);

        } catch (error) {

            return callback({
                message: error
            })
        }

    }
}

module.exports = {
    AddCategories
    , getCategories
}
