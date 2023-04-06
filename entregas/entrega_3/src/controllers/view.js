import User from "../dao/dbManagers/users.js";
import cartsModel from "../dao/models/carts.js";
import productsModel from "../dao/models/products.js";

const usersManager = new User();

//Renderizar usuarios
const renderUsers = async (req,res)=>{
    let users = await usersManager.getAll();
    console.log(users);
    res.render ('users',{users})
}

//Renderizar productos
const renderProducts = async (req,res) => {
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
}

//Renderizar carrito
const renderCart = async (req,res) => {
    let cid = req.params.cid;
    let cart = await cartsModel.findById(cid).populate("products.product").lean();
    let cartProducts = cart.products
    console.log(cartProducts);
    res.render('carts' , {cart, cartProducts})
}

//Renderizar mensajes
const renderMessages = async (req,res) => {
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
}

//Renderizar registro
const renderRegister = (req,res)=>{
    res.render('register');
}

//Renderizar login
const renderLogin = (req,res)=>{
    res.render('login');
}

//Realizar logout
const logout = async (req, res) => {
    req.session.destroy();
    res.send("logout success!");
}

export default {
    renderUsers,
    renderProducts,
    renderCart,
    renderMessages,
    renderRegister,
    renderLogin,
    logout
}