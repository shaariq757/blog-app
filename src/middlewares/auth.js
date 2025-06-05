import jwt from 'jsonwebtoken'



export default function verifyAuth(cookieName){
    return (req,res,next)=>{
        const token = req.cookies[cookieName]
        if(!token) return next()

        try{
            const data = jwt.verify(token,process.env.secret)
            req.user = data
        }
        catch(error){}

        return next()
    }
}