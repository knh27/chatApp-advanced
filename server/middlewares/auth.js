import jwt  from "jsonwebtoken";
import errors from "./errors.js";
// import { config } from "dotenv";
// config();

const {tryCatch, ErrorHandler}=errors;


//jahan check karna hai ki user logged in hai ya nahi uss route ke pahale isAuthenticated laga dena hai ya phir app mein app.use(isAuthenticated) aur iske baad sare route jahan check authentication required hai

const isAuthenticated=async (req,res, next)=>{

    const token=req.cookies.jwt;
    if(!token) return next(new ErrorHandler("Login to access this route", 401));

    const decodedData=jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData)
    req.userId=decodedData._id;
    // console.log(req.userId)
    next();
}


// const adminOnly=async (req,res, next)=>{

//     const token=req.cookies["admin-token"];
//     if(!token) return next(new ErrorHandler("only admin access this route", 401));

//     const adminSecretKey=jwt.verify(token, process.env.JWT_SECRET);

//     const isMatched=((process.env.ADMIN_SECRET_KEY || "password") === adminSecretKey)

//     if(!isMatched) return next(new ErrorHandler("invalid admin key", 404));
    
//     next();
// }




const adminOnly = async (req, res, next) => {
    console.log(process.env.ADMIN_SECRET_KEY)
    try {
        const token = req.cookies["admin-token"];
        if (!token) {
            return next(new ErrorHandler("Only admin can access this route", 401));
        }

        // Verify JWT Token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return next(new ErrorHandler("Invalid or expired token", 403));
        }

        // Ensure ADMIN_SECRET_KEY exists
        if (!process.env.ADMIN_SECRET_KEY) {
            return next(new ErrorHandler("Server misconfiguration: Missing ADMIN_SECRET_KEY", 500));
        }

        // Compare admin keys securely
        const isMatched = String(decoded.adminSecretKey) === String(process.env.ADMIN_SECRET_KEY);

        if (!isMatched) {
            return next(new ErrorHandler("Invalid admin key", 403));
        }

        next();
    } catch (error) {
        next(error);
    }
};


export {isAuthenticated, adminOnly}