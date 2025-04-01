import mongoose from "mongoose";
import {hash} from "bcrypt";

const {Schema, model, models}=mongoose;


/*models is internal object in mongoose that holds all created Model

console.log(mongoose.models);
{
    "User": Model { User }
}
  
*/
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    bio:{
        type:String,
        required:true
    }
    
}, {
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next;
    this.password=await hash(this.password, 10);
})

export const User=models.User || model("User", userSchema);

