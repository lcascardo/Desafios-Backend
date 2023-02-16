import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product:{
                    type:String,
                    ref:"products",
                    required: true,
                },
                quantity: {
                    type: Number || 1,
                    required:true,
                }
            }
        ],
        default: [],
        required: true
    }
})

const cartsModel = mongoose.model(cartsCollection , cartsSchema);

export default cartsModel;