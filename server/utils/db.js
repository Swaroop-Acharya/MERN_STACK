const mongoose=require('mongoose')

const URI="mongodb://127.0.0.1:27017/admin"


const connectDB =async()=>{
    try {
       await mongoose.connect(URI)
       console.log("connection successfull")
        
    } catch (error) {
        console.log('fAILERD TO CONNECT')
        process.exit(0)
    }
}

module.exports=connectDB;