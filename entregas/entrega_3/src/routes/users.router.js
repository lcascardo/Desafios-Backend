import { Router } from "express";
import controller from "../controllers/users.js";

const router = Router();

router.get("/", controller.getAll);

router.post("/", controller.saveUser);

router.post("/:uid/carts/:cid", controller.addUserToCart);

export default router;