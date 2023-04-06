import { Router } from "express";
import controller from "../controllers/users.js";

const router = Router();

//Trae todos los usuarios
router.get("/", controller.getAll);

//Crea un usuario
router.post("/", controller.saveUser);

//Le agrega un carrito al usuario
router.put("/:uid/carts/:cid", controller.addUserToCart);

export default router;