import { Router } from "express";
import Products from "../dao/dbManagers/products.js";
import Carts from "../dao/dbManagers/carts.js";
import Messages from "../dao/dbManagers/messages.js";

const router = Router();
const productsManager = new Products();
const cartsManager = new Carts();
const messagesManager = new Messages();

router.get('/products' , async (req,res) => {
    let products = await productsManager.getAll();
    console.log(products);
    res.render('products' , {products})
})

router.get('/carts' , async (req,res) => {
    let carts = await cartsManager.getAll();
    console.log(carts);
    res.render('carts' , {carts})
})

router.get('/messages' , async (req,res) => {
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
})

export default router;

