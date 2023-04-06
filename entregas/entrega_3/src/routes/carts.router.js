import { Router } from "express";
import controller from "../controllers/carts.js";

const router = Router();
//Trae todos los carritos
router.get('/', controller.getCarts)

//Crea un nuevo carrito
router.post('/', controller.saveCart)

//Agregar producto al carrito
router.post('/:cid/product/:pid', controller.addProductToCart)

//Borra productos del carrito
router.delete('/:cid/product/:pid', controller.deleteProdFromCart)

//Acualiza un carrito
router.put('/:cid', controller.updateCart)

//Aumenta la cantidad del producto en el carrito
router.put('/:cid/product/:pid', controller.updateProductQuantity )

//Vacio el carrito
router.delete('/:cid', controller.deleteAllProdFromCart)

export default router;