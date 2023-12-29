function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    // Bearer aldfjajdlfa
    const jwttoken = token.split(" ")[1];

    try{
        const decodedValue = jwt.verify(jwttoken, jwtPassword);
        if(decodedValue.username){
            next();
        }
    }
    catch(error){
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
}

module.exports = userMiddleware;