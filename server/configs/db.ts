
import mongoose from 'mongoose';
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://db:27017/myDatabase');
        console.log("success");
    }catch(err){
        console.log(err);

    }
}
export default connectDB;