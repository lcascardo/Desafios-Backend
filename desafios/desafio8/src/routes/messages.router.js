import { Router } from "express";
import Messages from "../dao/dbManagers/messages.js";




const router = Router();
const messagesManager = new Messages();

router.get('/' , async (req,res) => {
    let messages = await messagesManager.getAll();
    res.send({status:"success" , payload:messages})
})





export default router;