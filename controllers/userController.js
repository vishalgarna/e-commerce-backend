
const userserrvices = require('../services/userServices')



exports.createUser = (req, res, next) => {

    const params = {
        UserPassword: req.body.UserPassword,
        UserEmail: req.body.UserEmail,
        UserName: req.body.UserName
    }

    userserrvices.registerUser(params, (err, response) => {

        if (err) {
            next(err);
        }

        else {
            res.status(200).send({
                message: 'Success',
                data: response
            })
        }
    })


}


exports.loginuser = (req, res, next) => {

    userserrvices.loginUser(req.body, (err, response) => {

        if (err) {
            next(err);
        }


        else {
            res.status(200).send({
                message: 'Success',
                data: response
            })
        }
    })

}



exports.getAllusers = (req, res, next) => {

    userserrvices.GetAllUsers(req.body, (err, response) => {

        if (err) {
            next(err);
        }


        else {
            res.status(200).send({
                message: 'Success',
                data: response
            })
        }
    })

}