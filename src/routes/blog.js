import { Router } from "express";
import Blog  from "../models/blog.js";
import multer from "multer"
import path from "path"
import Comment from "../models/comment.js";
const blogRoute = Router()

blogRoute.get('/addBlog',(req,res)=>{
    res.render('addBlog',{
        user:req.user
    })
})

blogRoute.get('/:id',async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('author')
    const comments = await Comment.find({blogid:req.params.id}).populate('writtenBy')
    try{
        return res.render('blog',{
            user:req.user,
            blog,
            comments
        })
    }
    catch(error){
        res.send(error.message)
    }
})

const storage = multer.diskStorage(
{
    destination:function(req,file,cb){
    cb(null,path.resolve(`./public/uploads/`))
    },
    filename:function(req,file,cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null,fileName)
    }
}
)

const upload = multer({storage:storage})

blogRoute.post('/addBlog',upload.single('coverImage'),async(req,res)=>{
    const {title,body} = req.body
    const blog = await Blog.create({
        title,
        body,
        coverImage:`/uploads/${req.file.filename}`,
        author:req.user._id
    })
    try{
        await blog.save()
        return res.redirect(`/blog/${blog._id}`)
    }
    catch(error){
        res.send(error.message)
    }
})

blogRoute.post('/comment/:id',async (req,res)=>{
    await Comment.create({
        content:req.body.content,
        writtenBy:req.user._id,
        blogid:req.params.id
    })
    return res.redirect(`/blog/${req.params.id}`)
})

export default blogRoute