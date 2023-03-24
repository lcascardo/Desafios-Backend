import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product:{
                    type:String,
                    ref:"products",
                    require: true,
                },
                quantity: {
                    type: Number || 1,
                    require:true,
                }
            }
        ],
        default: [],
        require: true
    },

    user:{
        type:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:'users',
            }
        ],
        default:[]
    }
})

const cartsModel = mongoose.model(cartsCollection , cartsSchema);

export default cartsModel;