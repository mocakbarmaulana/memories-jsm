import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await userModel.findOne({email});

        if (!existingUser) return res.status(404).json({msg: "User doesn't exists"});

        const isPasswordCheck = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCheck) return  res.status(404).json({msg: "Invalid credentials!"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
        console.log(err)
    }
}

export const signUp = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await userModel.findOne({email});

        if (existingUser) return res.status(400).json({msg: "User already exists"});

        if (password !== confirmPassword) return res.status(400).json({msg: "Password don't match"});

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({email, password: hashPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});
        res.status(200).json({result, token});
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
}