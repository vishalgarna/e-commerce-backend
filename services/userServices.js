
const { param, use } = require('moongose/routes')
const auth = require('../errorhandling/auth')
const usermodel = require('../models/userModel')
const bycrypt = require('bcrypt')

async function loginUser(params, callback) {


    const UserEmail = params.UserEmail;
    const UserPassword = params.UserPassword;
    // first wwe find user in db with the help of UserEmail 
    // After the if user is != null then we match ecrtypte
    // passwrode in db with come password from req

    usermodel.findOne({ UserEmail: UserEmail }).then((data) => {


        if (data != null) {

            if (bycrypt.compareSync(UserPassword, data.UserPassword)) {
                const token = auth.genrateToken(data.toJSON());

                const responseData = {
                    ...data.toJSON(),
                    token: token
                };

                console.log(responseData);

                return callback(null, responseData);
            }


            else {

                return callback({
                    message: 'Wrong Password'
                })

            }

        }
        else {
            return callback({
                message: 'Invalid Credentials--1 ' + err
            })
        }

    }).catch((err) => {

        return callback({
            message: 'Invalid Credentials--2 ' + err
        })
    });


}

async function registerUser(params, callback) {

    // if user not provide emai/
    const UserEmail = params.UserEmail;
    if (UserEmail == undefined) {
        callback({
            message: 'Required email'
        })

    }

    // check if user already exixt

    const alreadyexixt = await usermodel.findOne({ UserEmail })

    console.log(alreadyexixt);


    if (alreadyexixt) {
        return callback({
            message: 'This Email is Already Exist'
        })
    }


    // this place are providing salt for strong
    const salt = bycrypt.genSaltSync(10);

    // resaign the userpassword to brctyp password 
    params.UserPassword = bycrypt.hashSync(params.UserPassword, salt);


    // after saving credentials in db

    try {
        const userschema = new usermodel(params);
        const response = userschema.save();

        return callback(null, response)
    } catch (error) {

        return callback({
            message: error
        })
    }
}



async function GetAllUsers(params, callback) {

    try {
        const response = await usermodel.find()


        return callback(null, response)
    } catch (error) {

        return callback({
            message: error
        })
    }
}
module.exports = {
    registerUser,
    loginUser,
    GetAllUsers
}