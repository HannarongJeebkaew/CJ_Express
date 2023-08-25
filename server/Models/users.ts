import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,  // In a real-world application, you should hash the password
  });
export default userSchema