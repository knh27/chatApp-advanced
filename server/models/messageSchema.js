import mongoose from "mongoose";
const {Schema, model, models, Types}=mongoose;

/*models is internal object in mongoose that holds all created Model

console.log(mongoose.models);
{
    "User": Model { User }
}
  
*/
const messageSchema = new Schema({
    attachments: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    content: {
        type: String,
    },

    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },

    chat: {
        type: Types.ObjectId,
        required: "Chat",
        required: true
    },


}, {
    timestamps: true
})

export const Message = models.Message || model("Message", messageSchema);

