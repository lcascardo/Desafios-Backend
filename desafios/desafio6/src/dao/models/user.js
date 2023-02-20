import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        default:"user"
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;