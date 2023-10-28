import mongoose from "mongoose";

const mySchema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    
    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },
    text: [],
}, {timestamps: true})

const user = mongoose.model('user', mySchema);
export default user;