
import mongoose from 'mongoose';
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://db:27017/myDatabase');
        // await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
        console.log("success");
    }catch(err){
        console.log(err);

    }
}
export default connectDB;