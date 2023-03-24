import { Router } from "express";
import controller from "../controllers/view.js";

const router = Router();

router.get ('/', controller.renderUsers)

router.get('/products' , controller.renderProducts)

router.get('/carts/:cid' , controller.renderCart)

router.get('/messages' , controller.renderMessages)

router.get('/register' , controller.renderRegister)

router.get('/login' , controller.renderLogin)

router.get("/logout", controller.logout);

export default router;

