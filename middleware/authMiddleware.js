const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if the json web token exist and it verified

    if(token){
        jwt.verify(token, "secret message", (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect("/login");
            }else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
}

module.exports = { requireAuth };