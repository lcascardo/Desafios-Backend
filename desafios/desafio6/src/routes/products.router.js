import { Router } from "express";
import Products from "../dao/dbManagers/products.js";
import productsModel from "../dao/models/products.js";

const router = Router();
const productsManager = new Products();

router.get('/' , async (req,res) => {
    let products = await productsManager.getAll();
    console.log(products);
    res.send({status:"success" , payload:products})
})

router.post('/' , async (req,res) => {
    const {title,description,price,code,quantity,category,thumbnail} = req.body;

    let newProduct = {
        title,
        description,
        price,
        code,
        quantity,
        category,
        thumbnail
    };

    const result = await productsManager.saveProduct(newProduct);
    res.send({status:"success" , payload:result});
})

router.put('/:pid' , async (req,res) => {
    let id = req.params.pid;
    const {title,description,price,code,quantity,category,thumbnail} = req.body;
    let updateProduct = {
        title,
        description,
        price,
        code,
        quantity,
        category,
        thumbnail
    };
    let result = await productsManager.updateProduct(id,updateProduct)
    res.send({status:"success" , payload:result})
})

router.delete('/:pid' , async (req,res) => {
    let id = req.params.pid;
    let result = await productsManager.deleteProduct(id);
    res.send({status:"success" , payload:result})
})

export default router;