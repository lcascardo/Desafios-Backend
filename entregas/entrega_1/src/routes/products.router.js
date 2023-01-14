import { Router } from "express";
import productManager from "../product.manager.js"

const router = Router();

const productos = new productManager("products.json");

// TRAER TODOS LOS PRODUCTOS O USAR ?LIMIT=
router.get('/', async (req, res) => {
    const { limit } = req.query;
    if (limit) {
        const products = await productos.getProducts();
        const productosLimitados = products.slice(0, limit);
        res.send(productosLimitados);
    }
    else {
        const mostrarProductos = await productos.getProducts();
        res.send(mostrarProductos);
    }
})


//TRAER OBJECTO DE PRODUCTO POR PARAMS
router.get('/:pid', async (req, res) => {
    const productoId = req.params.pid;
    const mostrarProducto = await productos.getProductById(parseInt(productoId));
    res.send(mostrarProducto);
})


//AGREGAR NUEVO PRODUCTO POR BODY
router.post('/' , (req , res) => {
    const product = req.body;
    productos.addProduct(product);
    res.send({status:"ok" , messsage:"Producto creado"});
})


//ACTIALIZAR PRODUCTO POR BODY UTILIZANDO PARAMS
router.put('/:pid' , async (req , res) => {
    let product = req.body;
    let id = req.params.pid;
    await productos.updateProduct(Number(id) , product);
    res.send({status:"ok" , message:"Producto actualizado"});
} )


//BORRAR PRODUCTO POR PARAMS
router.delete('/:pid' , async (req , res) => {
    let id = req.params.pid;
    let cantidad = await productos.getProducts().length;
    let products = await productos.deleteProduct(Number(id));
    
    
     if(cantidad === products.length) {
         console.log(cantidad , products);
         return res.status(400).send({status:"error" , error:"Informacion incompleta"})
     }
    
    res.send({status:"ok" , message:"Producto borrado"})

} )

export default router