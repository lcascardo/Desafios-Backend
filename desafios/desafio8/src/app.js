import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import usersRouter from "./routes/users.router.js"
import viewRouter from "./routes/view.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import Messages from "./dao/dbManagers/messages.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/sessions.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";


import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, console.log(`Server arriba: ${PORT}`));
const io = new Server(server);

const connection = mongoose.connect('mongodb+srv://LucasCascardo:cessna.152@codercluster.asaylu8.mongodb.net/?retryWrites=true&w=majority' , {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://LucasCascardo:cessna.152@codercluster.asaylu8.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:20
    }),
    secret:"secretCode",
    resave:false,
    saveUninitialized:false
}))

initializePassport();

app.use(
    passport.session({
      secret: "secretCoder",
    })
  );
  app.use(passport.initialize());

app.use('/', viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users',usersRouter)
app.use('/api/messages', messagesRouter);
app.use('/api/session' , sessionsRouter);

const messagesManager = new Messages();

io.on("connection", socket => {
    console.log("Tenemos un usuario conectado");

    socket.on('authenticated', data => {
        console.log(`Nombre de usuario ${data} recibido`);
        socket.broadcast.emit('newUserConnected', data);
    })

    socket.on("message", async (data) => {
        console.log(data);
        await messagesManager.saveMessage({ user: data.user, message: data.message })
        const logs = await messagesManager.getAll();
        io.emit("log", { logs });
    });

})

