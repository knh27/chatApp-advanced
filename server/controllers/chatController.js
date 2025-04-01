import errors from "../middlewares/errors";
const{ErrorHandler}=errors;

const createGroupChat=tryCatch(async(req, res, next)=>{
    const{name, members}=req.body;

    if(members.length<2){
        return next(
            new ErrorHandler("Group chat have atleast 3 members", 400)
        )
    }
})

export {
    createGroupChat,
}