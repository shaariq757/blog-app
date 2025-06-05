import {Router} from 'express'
import User from '../models/user.js';
import multer from 'multer'
import path from 'path'
const userRoute = Router()

userRoute.get('/signin',(req,res)=>{
    res.render('signin')
})

userRoute.get('/signup',(req,res)=>{
    res.render('signup')
})

const storage = multer.diskStorage(
{
    destination:function(req,file,cb){
    cb(null,path.resolve(`./public/images/`))
    },
    filename:function(req,file,cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null,fileName)
    }
}
)

const upload = multer({storage:storage})


userRoute.post('/signup',upload.single('profilePic'),async (req,res)=>{
    const {name,email,password} = req.body
    const user = await User.create({
        name,
        email,
        password,
        profilePic:`/images/${req.file.filename}`
    })
    try{
    await user.save()
    res.redirect('/')
    }
    catch(e){
        res.send(e)
    }
})

userRoute.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    try{
       const token = await User.loginService(email,password)
       res.cookie("token",token).redirect('/')
    }
    catch(error){
        res.render('signin',{'error':error.message})
    }
    
})
userRoute.get('/signout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})


export default userRoute