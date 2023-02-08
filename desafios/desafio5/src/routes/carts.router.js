import { Router } from "express";
import Carts from "../dao/dbManagers/carts.js";

const router = Router();
const cartsManager = new Carts();

router.get('/' , async (req,res) => {
    let carts = await cartsManager.getAll();
    res.send({status:"success" , payload:carts})
})

router.post('/' , async (req,res) => {
    const result = await cartsManager.saveCart();
    res.send({status:"success" , payload:result});
})

router.delete('/:cid' , async (req,res) => {
    let id = req.params.cid;
    const result = await cartsManager.deleteCart(id);
    res.send({status:"success" , payload:result});
})

router.post('/:cid/product/:pid' , async (req,res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    let result = await cartsManager.addProductToCart(cid,pid);
    res.send({status:"success" , payload:result});
})

export default router;