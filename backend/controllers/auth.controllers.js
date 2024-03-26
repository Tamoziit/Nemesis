import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        //Password Hashing
        const salt = await bcrypt.genSalt(10); //default salting value = 10. NB: Greater value ensures greater security but slower runtime processing.
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "Male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //Generating JWT Token
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }); //checking if user exists
        const isPasswordCorrect = await bcrypt.compare(password, user.password || ""); //decrypting & comparing the password;

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        generateTokenAndSetCookie( user._id, res );
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0}); //Setting user cookie to null
        res.status(200).json({message: "Logged out successfully"});
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

