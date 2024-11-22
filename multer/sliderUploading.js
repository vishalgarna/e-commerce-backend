const multer = require('multer')
const Filefilter = require('./FileFilter')
const Storage = multer.diskStorage({
    filename: function (req, file, cb) {

        return cb(null, `${Date.now()}- ${file.originalname}`)
    },
    destination: function (req, file, cb) {
        return cb(null, './uploads/slider')
    }
});

const Slider = multer({
    storage: Storage,
    fileFilter: Filefilter,

});

module.exports = Slider.single('slider');