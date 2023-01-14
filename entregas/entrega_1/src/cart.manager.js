import fs from 'fs';

class CartManager {

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

    //TRAE TODOS LOS CARRITOS
    getCarts = async () => {
        try {
            const objs = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(objs);
        }

        catch (err) {
            if (err.message.includes('no such file or directory')) return [];
            else console.log(err.message);
        }
    }

    //AGREGA UN CART NUEVO
    addCart = async () => {
        const db = await this.getCarts();
        try {
            if (db.length === 0) {
                let newId = 1;
                const newCart = { products: [], id: newId };
                db.push(newCart);
            }
            else {
                let newId = Math.max(...db.map(product => product.id)) + 1;
                const newCart = { products: [], id: newId };
                db.push(newCart);
            }

            await this.writeFile(db);
        }

        catch (err) {
            console.log(err.message);
        }
    }

    // AGREGAR PRODUCTO AL CARRITO
    addProductToCart = async (cartId, productId) => {
        const carritos = await this.getCarts();
        try {
            let carritoIndex = carritos.findIndex((cart) => cart.id === cartId);
            if(carritoIndex != -1) {
                let productoIndex = carritos[carritoIndex].products.findIndex((p) => p.product === productId); 
                if(productoIndex != -1) {
                    carritos[carritoIndex].products[productoIndex].quantity++
                }
                else {
                    carritos[carritoIndex].products.push({
                        product:productId,
                        quantity:1
                    })
                }
            }
            else{
                console.log("El carrito no existe");
            }
            await this.writeFile(carritos);
        }

        catch (err) {
            console.log(err.message);
        }
    }






}

//   function test () {
//       const carritos = new CartManager('carts.json');
//       carritos.addProductToCart(1,2); 
//   }

//   test();

export default CartManager;

