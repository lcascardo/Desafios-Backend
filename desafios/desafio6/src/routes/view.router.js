import { Router } from "express";
import Carts from "../dao/dbManagers/carts.js";
import Messages from "../dao/dbManagers/messages.js";
import Products from "../dao/dbManagers/products.js";
import cartsModel from "../dao/models/carts.js";
import productsModel from "../dao/models/products.js";



const router = Router();
const productsManager = new Products();
const cartsManager = new Carts();
const messagesManager = new Messages();

router.get('/products' , async (req,res) => {
    const isLogin = req.session.user ? true : false;
    const user = req.session.user;
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
        isLogin,
        user,
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

router.get('/register' , (req,res)=>{
    res.render('register');
})

router.get('/login' , (req,res)=>{
    res.render('login');
})

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.send("logout success!");
});

export default router;

