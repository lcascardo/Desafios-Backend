import { Router } from "express";
import controller from "../controllers/carts.js";

const router = Router();

router.get('/', controller.getCarts)

router.post('/', controller.saveCart)

router.post('/:cid/product/:pid', controller.addProductToCart)

router.delete('/:cid/product/:pid', controller.deleteProdFromCart)

router.put('/:cid', controller.updateCart)

router.put('/:cid/product/:pid', controller.updateProductQuantity )

router.delete('/:cid', controller.deleteAllProdFromCart)

export default router;