import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts',
        default: null
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
})

const userModel = mongoose.model(collection, schema);

export default userModel;