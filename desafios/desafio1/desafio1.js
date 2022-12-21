class ProductManager {

    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find(product => product.code !== code) || this.products.length === 0) {
            if (title && description && price && thumbnail && code && stock) {
                const product = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    id: this.id
                };
                this.id++;
                this.products.push(product);
            }
            else {
                console.log("ERROR: Falta rellenar campos");
            }
        }
        else {
            console.log("ERROR: El campo code se ha repetido");
        }
    }






    
    getProducts() {
        console.log(this.products);
    }






    getProductById(id) {
        if (this.products.find(product => product.id === id)) {
            let resultado = this.products.filter(product => product.id === id);
            console.log(resultado);
        }
        else {
            console.log("Not found");
        }
    }
}





let productos = new ProductManager();

productos.getProducts();

productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);

productos.getProducts();

productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);

productos.getProductById(0);

productos.getProductById(15);










