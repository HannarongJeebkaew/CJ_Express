import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import userSchema from "../Models/users";
const User = mongoose.model("User", userSchema);
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await User.findOne({ username });
    const salt = await bcrypt.genSalt(10);
    if (!user) {
      const newUser = new User({ username, email, password });
      newUser.password =await bcrypt.hash(password,salt);
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
    const user = await User.findOne({ username},{new:true});
    console.log("login",user);
    if(user){
      const isMatch =await bcrypt.compare(password,user.password)
      if(!isMatch){
          return res.status(400).send("Password Invalid!!!")
      }
      const token = jwt.sign({ id: user._id }, "jwtsecret", {
        expiresIn: "1h",
      });
      console.log("token",token);
      
      const payload = {user:{
        name:user.username,
        token:token
      }}
      res.send({ token ,payload});
  }else{
    return res.status(401).send({ message: "Invalid username or password" });
  }
    
   
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user = await User.findOne({_id:req.body.id}).select('-password').exec()
    console.log("user",user);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};
