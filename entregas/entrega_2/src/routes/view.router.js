import { Router } from "express";
import Products from "../dao/dbManagers/products.js";
import Carts from "../dao/dbManagers/carts.js";
import Messages from "../dao/dbManagers/messages.js";
import productsModel from "../dao/models/products.js";
import cartsModel from "../dao/models/carts.js";


const router = Router();
const productsManager = new Products();
const cartsManager = new Carts();
const messagesManager = new Messages();

router.get('/products' , async (req,res) => {
    const {
        page=1,
        limit=5,
        sort,
        category="",
    } = req.query;
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = 
    await productsModel.paginate({category:{$regex:category}} , {sort:{price:sort}, limit , page , lean:true});
    
    const products = docs;
    res.render('products' , {
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    });
   
   
})

router.get('/carts/:cid' , async (req,res) => {
    let cid = req.params.cid;
    let cart = await cartsModel.findById(cid).populate("products.product").lean();
    let cartProducts = cart.products
    console.log(cartProducts);
    res.render('carts' , {cart, cartProducts})
})

router.get('/messages' , async (req,res) => {
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
})

export default router;

