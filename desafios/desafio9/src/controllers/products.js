import Products from "../dao/dbManagers/products.js";

const productsManager = new Products();

//Traer todos los productos
const getAll = async (req,res) => {
    let products = await productsManager.getAll();
    console.log(products);
    res.send({status:"success" , payload:products})
}

//Agregar producto
const saveProduct = async (req,res) => {
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
}

//Actualizar producto
const updateProduct = async (req,res) => {
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
}

//Borrar producto
const deleteProduct = async (req,res) => {
    let id = req.params.pid;
    let result = await productsManager.deleteProduct(id);
    res.send({status:"success" , payload:result})
}

export default {
    getAll,
    saveProduct,
    updateProduct,
    deleteProduct
}