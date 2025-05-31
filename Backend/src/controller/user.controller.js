import { use } from "react";
import { User } from "../model/user.model.js";

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const token = user.generateToken();
        user.token = token;
        await user.save({
            validateBeforeSave: false  
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Failed to generate token");
    }
}

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = await generateToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -token");
        const options = {
            httpOnly:true,
            secure:true,
            sameSite:'None'
        }

        res
            .status(200)
            .cookie("token", token, options)
            .json({ message: "Login successful", user: loggedInUser });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export {
    createUser,
    LoginUser
}