import mongoose from "mongoose";

const db = mongoose.connect('mongodb://127.0.0.1:27017/blog-app',{maxPoolSize:1,maxConnecting:1})
mongoose.connection.on('connected',()=>console.log('Database connected'))
mongoose.connection.on('disconnected',()=>console.log('Database disconnected'))
export default db;