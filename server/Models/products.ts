import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    nameProduct:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    },weight:{
        type:Number,
        required:true
    },typeWeight:{
        type:String,
        required:true
    }
})
export default mongoose.model("product", productSchema)