const express = require('express');
const ProductManager = require('../src/desafio3');

const app = express();

const productos = new ProductManager('productos.txt');

app.get('/products', async (req, res) => {
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

app.get('/products/:pid', async (req, res) => {
    const productoId = req.params.pid;
    const mostrarProducto = await productos.getProductById(parseInt(productoId));
    console.log(mostrarProducto);
    res.send(mostrarProducto);
})









app.listen(8080, () => console.log("Puerto 8080 activado"))
