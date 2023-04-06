import { Router } from "express";
import controller from "../controllers/products.js";

const router = Router();

//Trae todos los productos
router.get('/' , controller.getAll)

//Crea un producto
router.post('/' , controller.saveProduct)

//Actualiza un producto
router.put('/:pid' , controller.updateProduct)

//Elimina un producto
router.delete('/:pid' , controller.deleteProduct)

export default router;