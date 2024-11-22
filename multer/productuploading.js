const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads/products')
    },


    filename: (req, file, next) => {
        next(null, `${Date.now()}-${file.originalname}`)
    }


})

const productuploading = multer({

    storage: storage
})

const product = productuploading.single('ProductImage');

module.exports = product