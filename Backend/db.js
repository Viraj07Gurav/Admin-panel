// mongodb+srv://viraj07gurav:<db_password>@cluster0.4qnff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose=require('mongoose');
const connectdb=async()=>{ 
    try{
        const conn=await mongoose.connect('mongodb+srv://test:dbtest@cluster0.mqr2s.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0',{
           
           
        });
        console.log(`MongoDB connected:${conn.connection.host}`);
    }catch(err){
        console.error(`Error:${err.message}`);
        process.exit(1);
    }
}
module.exports=connectdb;