import jwt from 'jsonwebtoken'


function genAuthToken(user){
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
        profilePic:user.profilePic,
        role:user.role
    }
    const token = jwt.sign(payload,process.env.secret)
    return token
}


export default genAuthToken