import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
    },
    thumbnail:{
        type:String,
        required:true,
        default:"Sin imagen"
    },
    category:{
        type:String,
        required:true
    }
})
productsSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(productsCollection , productsSchema);

export default productsModel;