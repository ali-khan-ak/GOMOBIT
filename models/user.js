import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    phonenumber: {
       type: String
    },
    age:{
        type: String
    },
    
    
},{timestamps: true}); 

const user = mongoose.model('User',userSchema);

export default user;