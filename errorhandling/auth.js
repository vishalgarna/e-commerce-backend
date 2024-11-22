
const jwt = require('jsonwebtoken');

const globalkey = 'saini'

// this is function checke
// validdate the token comme from request
function validToken(req, res, next) {
    // Get the authorization header
    const token = req.headers.authorization;

    // Log the received authorization header
    // console.log('Authorization Header:', authHeader);

    // Extract the token from the "Bearer token" string
    // const token = authHeader && authHeader.split(' ')[1];

    // Log the extracted token

    // Check if token is null
    if (token == null) {
        console.log('No token found');
        return res.sendStatus(401); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, globalkey, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403); // Forbidden
        }

        // Attach the user to the request object
        console.log(user);

        req.user = user;

        // Proceed to the next middleware function
        next();
    });
}

// this function is create new token 
function genrateToken(usermodel) {

    return jwt.sign({ data: usermodel }, globalkey, {

        expiresIn: '7d'

    });
}

module.exports = {
    validToken,
    genrateToken
}