const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    //SOBREESCRIBE EL ARCHIVO
    writeFile = async (data) => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(data)
            )
        }

        catch (err) {
            console.log(err.message);
        }
    }

    //TRAE TODOS LOS PRODUCTOS
    getProducts = async () => {
        try {
            const objs = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(objs);
        }

        catch (err) {
            if (err.message.includes('no such file or directory')) return [];
            else console.log(err.message);
        }
    }

    //AGREGA UN PRODUCTO NUEVO
    addProduct = async (product) => {
        const db = await this.getProducts();
        try {
            if (db.length === 0) {
                let newId = 1;
                const newProduct = { ...product, id: newId };
                db.push(newProduct);
            }
            else {
                let newId = Math.max(...db.map(product => product.id)) + 1;
                const newProduct = { ...product, id: newId };
                db.push(newProduct);
            }

            await this.writeFile(db);
        }

        catch (err) {
            console.log(err.message);
        }
    }

    //TRAE UN PRODUCTO FILTRANDO POR ID
    getProductById = async (id) => {
        const products = await this.getProducts();
        try {
            const product = products.find(product => product.id === id);
            return product ?
                product :
                {error:"El Producto no existe"};
        }

        catch (err) {
            console.log(err.message);
        }
    }

    //ACTUALIZA UN PRODUCTO FILTRANDO POR ID
    updateProduct = async (id, product) => {
        const products = await this.getProducts();
        const newProduct = product
        try {
            const updateProducts = products.map((product) => {
                if (product.id === id) {
                    return { ...product, ...newProduct };
                }
                else {
                    return { ...product }
                }
            });
            await this.writeFile(updateProducts);

        }

        catch (err) {
            console.log(err.message);
        }
    }

    //ELIMINA UN PRODUCTO FILTRANDO POR ID
    deleteProduct = async (id) => {
        let products = await this.getProducts();
        try {
            products = products.filter(product => product.id != id);
            await this.writeFile(products);
        }

        catch (err) {
            console.log(err.message);
        }
    }

}

//Se creará una instancia de la clase “ProductManager”
let productos = new ProductManager('productos.txt');

const test = async () => {
    let producto = {
        title: "producto 1",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 2",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 3",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 4",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 5",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 6",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 7",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 8",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 9",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
    producto = {
        title: "producto 10",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);
}



module.exports = ProductManager;