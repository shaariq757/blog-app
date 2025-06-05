import express from 'express'
import path from 'path'
import Blog from './src/models/blog.js'
import userRoute from './src/routes/user.js'
import blogRoute from './src/routes/blog.js';
import  db  from "./src/db/db.js";
import cookieParser from 'cookie-parser';
import verifyAuth from './src/middlewares/auth.js';

const app = express()
app.set('view engine','ejs')
app.set('views','./views')
db;
app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(verifyAuth('token'))
app.get('',async (req,res)=>{
    const blogs = await Blog.find({})
    res.render('index',{user:req.user,blogs})
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(process.env.PORT,()=>console.log(`Server iniitialized on ${process.env.PORT}`))
