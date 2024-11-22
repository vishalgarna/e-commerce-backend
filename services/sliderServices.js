const slidermodel = require('../models/slidermodel');



async function AddSlider(params, callback) {

    if (!params.SliderName) {
        return callback({
            message: 'Name is  Required'
        })
    }

    try {

        const slider = slidermodel(params)
        await slider.save().then((response) => {
            return callback(null, response);
        })


    } catch (error) {
        return callback({
            message: error
        })
    }

}

async function GetSliders(params, callback) {

    try {

        const response = await slidermodel.find();
        callback(null, response);

    } catch (error) {
        return callback({
            message: error
        })
    }


}

module.exports = {
    AddSlider,
    GetSliders
}