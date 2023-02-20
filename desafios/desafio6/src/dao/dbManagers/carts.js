import cartsModel from "../models/carts.js";
import productsModel from "../models/products.js";

export default class Carts {
    constructor() {
        console.log("Working in mongoDB with carts");
    }

    getAll = async () => {
        let carts = await cartsModel.find().lean();
        return carts;
    }

    getOne = async (id) => {
        let cart = await cartsModel.findOne({_id: id}).lean();
        return cart;
    }

    saveCart = async () => {
        let result = await cartsModel.create({
            products: []
        });
        return result;
    }

    deleteCart = async (id) => {
        let result = await cartsModel.findByIdAndDelete(id);
        return result;
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cartFound = await cartsModel.findById(cid);
            if (!cartFound)
                return {
                    status: 404,
                    error: `Cart with id ${cid} not found`,
                };

            const productFound = await productsModel.findById(pid);
            if (!productFound)
                return {
                    status: 404,
                    error: `Product with id ${pid} not found`,
                };

            let productIndex = cartFound.products.findIndex(p => p.product === pid)
            if(productIndex != -1) {
                let updateProducts = cartFound;
                updateProducts.products[productIndex].quantity++
                return await cartsModel.findByIdAndUpdate(cid , {products:updateProducts.products})
            }
            else{
                return await cartsModel.findByIdAndUpdate(cid , {$push:{products:{product:pid , quantity:1}}})
            }
            
        } catch (err) {
            console.log(err);
        }


    }

    updateCart = async(cid, cart) => {
        let result = await cartsModel.updateOne({_id: cid}, cart);
        return result;
    }
}