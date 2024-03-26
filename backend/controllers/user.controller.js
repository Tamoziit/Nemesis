import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-passwords"); //Display all users excluding the logged in user , i.e, ourselves. Also we don,t want to fetch their passwords

        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.log("Error in getUserForSidebar", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}