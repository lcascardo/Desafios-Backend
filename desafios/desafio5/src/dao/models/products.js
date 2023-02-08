import mongoose from "mongoose";

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const productsModel = mongoose.model(productsCollection , productsSchema);

export default productsModel;