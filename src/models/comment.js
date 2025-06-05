import {Schema,model} from 'mongoose'

const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    writtenBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    blogid:{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    },
},
    {timestamps:true}
)

const Comment = model('Comment',commentSchema)
export default Comment
