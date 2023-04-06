import Carts from "../dao/dbManagers/carts.js";
import Products from "../dao/dbManagers/products.js";

const cartsManager = new Carts();
const productManager = new Products();

//Traer carritos
const getCarts = async (req, res) => {
    let carts = await cartsManager.getAll();
    res.send({ status: "success", payload: carts })
}

//Guardar carrito
const saveCart = async (req, res) => {
    const {products,user} = req.body

    let newCart = {
        products,
        user
    }
    
    const result = await cartsManager.saveCart(newCart);
    res.send({ status: "success", payload: result });
}

//Agregar producto en carrito
const addProductToCart = async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let result = await cartsManager.addProductToCart(cid, pid);
    res.send({ status: "success", payload: result });
}

//Borrar producto de carrito
const deleteProdFromCart = async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    let productExist = await productManager.getOne(pid);
    if (!productExist) {
        res.send({ status: 404, message: "El producto no existe" });
    }
    else {
        let cart = await cartsManager.getOne(cid);
        if (!cart) {
            res.send({ status: 404, message: "El carrito no existe" });
        }
        else {
            let productInCartIndex = cart.products.findIndex(p => p.product === pid)
            if (productInCartIndex == -1) {
                res.send({ status: 404, message: "El producto no existe dentro del carrito" });
            }
            else {
                cart.products.splice(productInCartIndex, 1);
                let result = await cartsManager.updateCart(cid, cart);
                res.send({ status: "Ok", payload: result });
            }
        }
    }
}

//Actualizar carrito
const updateCart = async (req, res) => {
    let cid = req.params.cid;
    let products = req.body;

    let cart = await cartsManager.getOne(cid);
    let cartProducts = cart.products;

    let productsIds = [];
    if (cartProducts.length > 0) {
        cartProducts.forEach(product => {
            productsIds.push(product._id);
        })
    }

    products.forEach(async (product) => {
        let productIndex = productsIds.findIndex((p) => p == product._id);

        if (productIndex != -1) {
            cartProducts[productIndex].quantity = product.quantity;
        } else {
            cartProducts.push(product);
        }
    })

    cart.products = cartProducts;
    let result = await cartsManager.updateCart(cid, cart);
    res.send({ status: "success", payload: result });
}

//Actualizar cantidad de producto en carrito
const updateProductQuantity = async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let { quantity } = req.body;

    let cart = await cartsManager.getOne(cid);
    let productExist = false;
    cart.products.forEach(product => {
        if (product._id == pid) {
            product.quantity = quantity;
            productExist = true
        }
    })
    if (productExist === true) {
        let result = await cartsManager.updateCart(cid, cart);
        res.send({ status: "Success", payload: result });
    } else {
        res.send({ status: 404, payload: "El producto no existe en el carrito" });
    }
}

//Vaciar productos de carrito
const deleteAllProdFromCart = async (req, res) => {
    const cid = req.params.cid;
    let cart = await cartsManager.getOne(cid);
    cart.products = [];
    let result = await cartsManager.updateCart(cid, cart);
    res.send({ status: "Success", payload: result });
}


export default {
    getCarts,
    saveCart,
    addProductToCart,
    deleteProdFromCart,
    updateCart,
    updateProductQuantity,
    deleteAllProdFromCart
}