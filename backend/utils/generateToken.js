import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    }); //creating JSON web token payload

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms format
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //Prevents CSRF attacks, cross-site requests, forgery attacks
        secure: process.env.NODE_ENV !== "development", //true when Node_env is not development, i.e production
    }); //setting up cookie
}

export default generateTokenAndSetCookie;