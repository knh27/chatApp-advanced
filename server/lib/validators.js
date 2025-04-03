import { body, validationResult, check } from "express-validator";
import errors from "../middlewares/errors.js";
const {ErrorHandler}=errors;

const validateHandler=(req, res, next)=>{
    const errors=validationResult(req);
    const errorMessages=errors.array().map((err)=>err.msg).join(",");
    console.log(errorMessages )

    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages, 400))
}

const registerValidator=()=>[
    // body(["name", "username", "password", "bio"]).notEmpty(),
    body("name", " Enter Name").notEmpty(),
    body("username", " Enter Username").notEmpty(),
    body("bio", "  Enter Bio").notEmpty(),
    body("password", " Enter Password").notEmpty(),
    check("avatar", " Upload Avatar").notEmpty(),
]
const loginValidator=()=>[
    body("username", " Enter Username").notEmpty(),
    body("password", " Enter Password").notEmpty(),
];

const newGroupValidator=()=>[
    body("name", " Enter Name").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Enter members")
        .isArray({min:2, max:100})
        .withMessage("members must be 2-100")
]




export {registerValidator, validateHandler,loginValidator,newGroupValidator}