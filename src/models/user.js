import {Schema,model} from "mongoose";
import {createHmac, randomBytes} from 'node:crypto'
import genAuthToken from '../auth/auth.js'
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:false
    },
    profilePic:{
        type:String,
        default:'./images/default.png',
        required:true
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
},
{timestamps:true}
)
userSchema.pre('save',function (next){
    const user = this
    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString()
    const hashPass = createHmac('sha256',salt).update(user.password).digest('hex')

    this.password = hashPass
    this.salt = salt

    next()
})

userSchema.statics.loginService = async(email,password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('Email not registered');
    const salt = user.salt
    const hashPass = createHmac('sha256',salt).update(password).digest('hex')

    if(!(hashPass === user.password)) throw new Error('Incorrect email or password')
        
    const token = genAuthToken(user)
    return token
}

const User = model('User',userSchema)
export default User