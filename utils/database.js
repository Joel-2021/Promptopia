import mongoose from "mongoose";
let isConnected=false;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('mongodb is connected')
        return 
    }   
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true
        console.log('mongdb is connected')
    } catch (error) {
        console.log(error)
        
    }
}