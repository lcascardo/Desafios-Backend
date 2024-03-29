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
                null;
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
    // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    console.log(await productos.getProducts());

    // Se llamará al método “addProduct” con los campos:
    // title: “producto prueba”
    // description:”Este es un producto prueba”
    // price:200,
    // thumbnail:”Sin imagen”
    // code:”abc123”,
    // stock:25
    const producto = {
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    };
    await productos.addProduct(producto);

    // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    console.log(await productos.getProducts());

    //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
    console.log(await productos.getProductById(1));

    //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    const productoActualizado = {
        title: "manzana",
        description: "fruta",
        price: 400,
        thumbnail: "Sin imagen",
        code: "def456",
        stock: 30
    };
    await productos.updateProduct(1, productoActualizado);
    console.log(await productos.getProducts());

    //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    await productos.deleteProduct(1);
    console.log(await productos.getProducts());
}

test();