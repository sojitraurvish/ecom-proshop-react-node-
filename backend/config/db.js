import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            // useUnifiedTropology:true,
            // useNewUrlParser:true,
            // useCreateIndex:true
        })

        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1);
    }
}

export default connectDb