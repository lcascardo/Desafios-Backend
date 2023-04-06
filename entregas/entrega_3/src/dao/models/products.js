import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    thumbnail:{
        type:String,
        require:true,
        default:"Sin imagen"
    },
    category:{
        type:String,
        require:true
    }
})
productsSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(productsCollection , productsSchema);

export default productsModel;