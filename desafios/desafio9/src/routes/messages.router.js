import { Router } from "express";
import controller from "../controllers/messages.js";

const router = Router();

router.get('/' , controller.getAll)

export default router;