import { Router } from "express";
import controller from "../controllers/products.js";

const router = Router();

router.get('/' , controller.getAll)

router.post('/' , controller.saveProduct)

router.put('/:pid' , controller.updateProduct)

router.delete('/:pid' , controller.deleteProduct)

export default router;