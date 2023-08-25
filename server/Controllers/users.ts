import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userSchema from "../Models/users";
const User = mongoose.model("User", userSchema);
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send({ message: "User registered" });
    }else{
      return res.status(401).send({ message: "มี username นี้อยู่ในระบบแล้ว" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, "yourSecretKey", {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (err) {
    console.log(err);
  }
};
