import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, //setting type to Id type
        ref: "User", //Id from User model
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true}); //Timestamps: true --> By default provides us createdAt, updateAt fields.

const Message = mongoose.model("Message", messageSchema);

export default Message;