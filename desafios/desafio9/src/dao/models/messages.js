import mongoose from "mongoose";

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})

const messagesModel = mongoose.model(messagesCollection , messagesSchema);

export default messagesModel;