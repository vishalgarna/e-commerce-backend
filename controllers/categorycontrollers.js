;
const categgoriesservices = require('../services/categoriesservices')
// multer file import for uploading images in local storage 
const categoriesuploading = require('../multer/categoriesuploading');

exports.createCategory = (req, res, next) => {



    // uploading file and image in local storage using multer
    categoriesuploading(req, res, async (err) => {

        if (err) {
            console.log(err);

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
