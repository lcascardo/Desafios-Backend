import userModel from "../models/user.js";

export default class Users {
    constructor() {
        console.log("Working in mongoDB with users");
    }

    getAll = async () => {
        let users = await userModel.find().populate('cart');
        return users.map(user => user.toObject())
    }

    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result;
    }

    getById = async (params) => {
        let result = await userModel.findOne(params).populate("cart").lean();
        return result;
    };

    updateUser = async (id, user) => {
        delete user._id;
        let result = await userModel.updateOne({ _id: id }, { $set: user });
        return result;
    };
}