import mongoose from "mongoose"

// Connect MongoDB Database
const connectDB = async()=>{
    mongoose.connection.on('connected',()=>console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/LLM`)
}
export default connectDB