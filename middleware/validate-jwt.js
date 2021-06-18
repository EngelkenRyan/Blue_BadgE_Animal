const jwt = require("jsonwebtoken");  // importing
const { User } = require("../models"); // importing

const validateJWT = async (req, res, next) => { 
    if (req.method == "OPTIONS") { 
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const { authorization } = req.headers; // Checking that the header has bearer and token
        const payload = authorization ? jwt.verify(authorization.includes("Bearer") // Checks to make sure we have the authorization
            ? authorization.split(" ")[1] //splits Bearer and Token so it just gives token
            : authorization, 
            process.env.JWT_SECRET
        ) 
        : undefined; 

        if (payload) {
            let foundUser = await User.findOne({ where: { id: payload.id } });

            if (foundUser) {
                req.user = foundUser; // used in line  14 on animal controller
                next();
            } else {
                res.status(400).send({ message: "Not Authorized" });
            }
        } else {
            res.status(401).send({ message: "Invalid Token" });
        }
    } else {
        res.status(403).send({ message: "Forbidden" })
    }
};

module.exports = validateJWT
