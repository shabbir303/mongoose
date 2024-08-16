
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = ()=>{
    const token  = req?.cookies?.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized, token not provided"});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized, invalid token"});
        }
        req.user = decode;
        next();
    })
}

module.exports = verifyToken;