const multer = require('multer');

// this file is filter file like check ext and size of file 
const filefilter = require('./FileFilter')


const storage = multer.diskStorage({


    destination: (req, file, callback) => {
        callback(null, './uploads/categories');
    },

    filename: (req, file, callback) => {
        callback(null, `${Date.now()} - ${file.originalname}`);
    }


});

const categoriesstorage = multer({
    storage: storage,
    fileFilter: filefilter
});


const categoriesfieldname = categoriesstorage.single('categoryImage')

module.exports = categoriesfieldname;
