import mongoose from "mongoose";

const db = mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>console.log('Database connected'))
mongoose.connection.on('disconnected',()=>console.log('Database disconnected'))
export default db;