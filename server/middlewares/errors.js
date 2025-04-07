

 const errorMiddleware=(err, req, res, next)=>{
    err.message||="Internal server Error";
    err.statusCode ||=500;
    if(err.code===11000){
        err.message=`duplicate keys :${Object.keys(err.keyPattern).join(", ")}`
        err.statusCode=400;
    }

    if(err.name==="CastError"){
        err.message=`invalid format of ${err.path}`,
        err.statusCode=400
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}


const tryCatch=(passedFun)=>async (req, res, next)=>{
    try {
        await passedFun(req, res, next);
    } catch (err) {
        next(err);
    }
};


class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
    }
}

export default {
    errorMiddleware,
    tryCatch,
    ErrorHandler,
}
/**
 default export like this is correct but it doesnot allow destructuring in import like this

 import {errorMiddleware} from "./middlewares/errors.js

 do it like -
 import errors from "./middlewares/errors.js"
 const {errorMiddleware}=errors;
 "
 */