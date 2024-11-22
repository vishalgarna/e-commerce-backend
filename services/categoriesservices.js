// db require
require('../db.config')
const categorymodel = require('../models/categoriesmodel')





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
            const data = new categorymodel(params)
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
                .skip((page - 1) * pagesize)
                .limit(pagesize);

            return callback(null, response);

        } catch (error) {

            return callback({
                message: error
            })
        }

    }
}

async function getCategoriesById(params, callback) {

    const id = params.id;


    try {

        const data = await categorymodel.findById(id)
        if (!data) {
            callback({
                message: 'Id Not Found Pleasne Enter Correct id '
            })
        }

        callback(null, data)

    } catch (error) {
        callback({
            message: error
        })
    }


}

async function UpdateCategory(params, callback) {

    if (!params.id) {
        callback({
            message: 'Category Id is Required '
        })
    }
    else {
        try {

            const id = params.id

            const response = await categorymodel.findByIdAndUpdate(id, params)
            if (!response) {
                callback({
                    message: 'Id Not Found Pleasne Enter Correct id '
                })
            }
            callback(null, response)

        } catch (error) {

            callback({
                message: error
            })
        }
    }

}
async function DeleteCategory(params, callback) {

    if (!params.id) {
        callback({
            message: 'Category Id is Required '
        })
    }
    else {
        try {

            const id = params.id

            const response = await categorymodel.findByIdAndDelete(id)
            if (!response) {
                callback({
                    message: 'Id Not Found Pleasne Enter Correct id '
                })
            }
            callback(null, response)

        } catch (error) {

            callback({
                message: error
            })
        }
    }

}

module.exports = {
    AddCategories
    , getCategories,
    getCategoriesById,
    UpdateCategory,
    DeleteCategory
}
