import mongoose from "mongoose";
const {Schema, model, models, Types}=mongoose;

const chatSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    groupChat:{
        type:Boolean,
        default:false,
    },
    creator:{
        type:Types.ObjectId,
        ref:"User",
         //it wil store objectId of User model,,,,,to fetch all details, of that id, use populate
        
    },
    members:[
        {
            type:Types.ObjectId,
            ref:"User",
        }
    ]
    
}, {
    timestamps:true
})

export const Chat=models.Chat || model("Chat", chatSchema);

