import { Router } from "express";
import cartManager from "../cart.manager.js";
import productManager from "../product.manager.js";

const router = Router();
const carritos = new cartManager("carts.json");
const productos = new productManager("products.json");

//CREAR NUEVO CARRITO
router.post("/", async (req, res) => {
    await carritos.addCart();
    const carts = await carritos.getCarts();

    res.send({ status: "ok", message: "Carrito creado", idcarrito: carts.pop().id });
});


//TRAER PRODUCTOS DE UN CARRITO QUE SELECCIONAMOS CON PARAMS
router.get("/:cid", async (req, res) => {
    const cartId = Number(req.params.cid);

    const arrayCarritos = await carritos.getCarts();

    const carrito = arrayCarritos.find((cart) => cart.id === cartId);

    carrito
        ? res.send(carrito.products)
        : res
            .status(400)
            .send({ status: "error", error: "El carrito no existe" });
});

//TRAER TODOS LOS CARRITOS
router.get("/", async (req, res) => {
    const carritos_ = await carritos.getCarts();
    res.json({ carritos_ });
});


//AGREGAR PRODUCTO A CARRITO QUE ELIJAMOS
router.post('/:cid/product/:pid', async (req, res) => {
    const arrayCarritos = await carritos.getCarts();
    const arrayProductos = await productos.getProducts()
    let carritoIndex = arrayCarritos.findIndex((cart) => cart.id == req.params.cid);
    let productoIndex = arrayProductos.findIndex((p) => p.id == req.params.pid);

    if (carritoIndex == -1) {
        res.status(400).send({
            status: "error",
            error: "El carrito no existe",
        });

        return;
    }

    if (productoIndex == -1) {
        res.status(400).send({
            status: "error",
            error: "El producto no existe",
        });

        return;
    }

    await carritos.addProductToCart(Number(req.params.cid) , Number(req.params.pid));
    res.send({ status: "ok", message: "Producto agregado" });
})


export default router