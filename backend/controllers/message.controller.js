import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; //Destructuring (JS fundamentals)
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }); //getting the conversations b/w the sender & receiver from the DB by their ids.

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            }); //In case of first conversation, we create a new convo.
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id); //pushing the id of the new chat into messages[] array of conversation
        }

        //Socket.io Functionality

        await Promise.all([conversation.save(), newMessage.save()]); //Saving the convo & chats to the DB. in parallel --> Faster than saving them individually.

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); //populate() method of mongoose is used to return the objects of messsages (i.e. The content), instead of the id(reference) only.

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}