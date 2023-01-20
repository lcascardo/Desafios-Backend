import express from 'express';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/view.router.js';
import { Server } from 'socket.io';
import ProductManager from './product.manager.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

//INICIALIZAMOS EXPRESS
const app = express(); //TRAEMOS EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = app.listen(8080, () => console.log("Server activado")); //ACTIVAMOS SERVIDOR CON EXPRESS


const socketServer = new Server(httpServer); //CREAMOS UN SERVIDOR CON WEBSOCKET 
app.engine('handlebars', handlebars.engine()); //AGREGAMOS HANDLEBARS A EXPRESS
app.set('views', __dirname + '/views'); //SETEAMOS LAS VIEWS
app.set('view engine', 'handlebars'); //SETEAMOS LAS VISTAS CON HANDLEBARS
app.use(express.static(__dirname + '/public')); //USAMOS LA CARPETA ESTATICA PARA EL SERVIDOR
app.use('/', viewRouter); //USAMOS LA RUTA DE viewRouter
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);



//on = escuchar / recibir 
//emit = hablar / enviar



socketServer.on('connection', socket => {
    console.log("Tenemos un cliente conectado");

    socket.on('message', data => {
        console.log(data);
    })

    //realTimeProducts
    socket.emit('updateProducts' , "Lista de todos los productos")

    socket.on('products' , ()=>{
        console.log("llegaron los productos");
        socket.emit('productList' , "Todos los productos");
    })

}) //HACEMOS QUE EL SOCKET ESCUCHE CUANDO UN CLIENTE SE CONECTE Y MANDE UN MENSAJE DE QUE SE CONECTO







