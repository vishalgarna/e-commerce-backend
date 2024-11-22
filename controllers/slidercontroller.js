const sliderservices = require('../services/sliderServices')
const slideruploadings = require('../multer/sliderUploading')


exports.addslider = (req, res, next) => {

    slideruploadings(req, res, (err) => {

        if (err) {
            next(err);
        }

        const path = req.file != undefined ? req.file.path.replace(/\\/g, '/') : '';

        const params = {
            SliderName: req.body.SliderName,
            SliderImage: path
        }

        sliderservices.AddSlider(params, (err, response) => {

            if (err) {
                next(err);
            }

            else {
                res.send({
                    mesaage: 'success',
                    data: response
                })
            }
        })
    })

}


exports.getslider = (req, res, next) => {

    const params = {};
    sliderservices.GetSliders(params, (err, response) => {

        if (err) {
            next(err);
        }

        else {
            res.send({
                mesaage: 'success',
                data: response
            })
        }
    })

}
