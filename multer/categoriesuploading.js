const multer = require('multer');




const storage = multer.diskStorage({


    destination: (req, file, callback) => {
        callback(null, './uploads/categories');
    },

    filename: (req, file, callback) => {
        callback(null, `${Date.now()} - ${file.originalname}`);
    }


});

const categoriesstorage = multer({
    storage: storage
});


const categoriesfieldname = categoriesstorage.single('categoryImage')

module.exports = categoriesfieldname;
