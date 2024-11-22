;
const categgoriesservices = require('../services/categoriesservices')
// multer file import for uploading images in local storage 
const categoriesuploading = require('../multer/categoriesuploading');

exports.createCategory = (req, res, next) => {




    // uploading file and image in local storage using multer
    categoriesuploading(req, res, async (err) => {

        if (err) {
            next(err);

        }


        //replace(/\\/g, '/') - yeh 
        //replace method hai jo sabhi
        // backslashes ko forward slashes mein convert karta hai.

        else {

            const path = req.file !== undefined ? req.file.path.replace(/\\/g, '/') : " ";

            const data = {
                categoryName: req.body.categoryName,
                categoryImage: path

            }


            categgoriesservices.AddCategories(data, (err, response) => {

                if (err) {
                    next({ message: err })

                }

                else {
                    return res.status(200).send({
                        message: 200,
                        data: response

                    })
                }

            })
        }
    })

}


exports.AllCategory = (req, res, next) => {

    // they are awesome come host id and userafent
    // console.log(req.headers.host);

    const params = {
        page: parseInt(req.query.page),
        pagesize: parseInt(req.query.pagesize)
    }

    categgoriesservices.getCategories(params, (err, response) => {

        if (err) {
            next(err);
        }

        else {
            res.status(200).send({
                message: 'Success',
                data: response
            })
        }

    });

}


exports.getCategoryById = async (req, res, next) => {

    const params = { id: req.params.id }

    categgoriesservices.getCategoriesById(params, (err, response) => {
        if (err) {
            next(err)
        }

        res.status(200).send(response)
    })
};


exports.UpdateCategory = async (req, res, next) => {

    const params = {
        id: req.params.id,
        categoryName: req.body.categoryName,

    }

    categgoriesservices.UpdateCategory(params, (err, response) => {
        if (err) {
            next(err)
        }

        res.status(200).send({ message: 'suceess', data: response })
    })
};



exports.deletCategory = async (req, res, next) => {

    const params = {
        id: req.params.id,
        categoryName: req.body.categoryName,

    }

    categgoriesservices.DeleteCategory(params, (err, response) => {
        if (err) {
            next(err)
        }

        res.status(200).send({ message: 'suceess', data: response })
    })
};
