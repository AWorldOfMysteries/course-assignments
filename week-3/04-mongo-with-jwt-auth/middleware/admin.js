const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../../02-jwt");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    // Bearer aldfjajdlfa
    const jwttoken = token.split(" ")[1];

    try{
        const decodedValue = jwt.verify(jwttoken, jwtPassword);
        if(decodedValue.username){
            req.username = decodedValue.username;
            next();
        }
    }
    catch(error){
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }

}

module.exports = adminMiddleware;