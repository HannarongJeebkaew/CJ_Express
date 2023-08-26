import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    nameProduct:{
        type:String,
        require:true
    },price:{
        type:Number,
        require:true
    },weight:{
        type:Number,
        require:true
    },typeWeight:{
        type:String,
        require:true
    }
})
export default mongoose.model("product", productSchema)