import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";

// Inicio servidor
const app = express();
const PORT = 8080;
const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// Levantar servidor especificando el puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor con Express trabajando en el puerto: ${PORT} solicitado en la consigna`);
});

// Inicializar Socket.IO con el servidor de Express
const io = new Server(server);

// Ruta principal
app.get("/", async (req, res) => {
    let allProducts = await product.getProducts();
    res.render("index", {
        title: "Pre entrega 2 - Álvarez",
        products: allProducts
    });
});

// Ruta para producto por ID
app.get("/:id", async (req, res) => {
    let prod = await product.getProductsById(req.params.id);
    res.render("prod", {
        title: "Detalles del Producto - Álvarez",
        product: prod
    });
});

// Ruta para mostrar el chat
app.get("/chat", (req, res) => {
    res.render("chat", {
        title: "Chat - Coderchat"
    });
});

// WebSocket
const messages = [];  // Asegúrate de definir 'messages' correctamente

io.on("connection", (socket) => {
    console.log(`El usuario ${socket.id} se ha conectado`);
    
    socket.on("userConnection", (data) => {
        console.log(data);
        messages.push({
            id: socket.id,
            name: data.user,
            message: `${data.user} Conectado`,
            date: new Date().toTimeString()
        });

        io.sockets.emit("userConnection", messages);
    });

    socket.on("userMessage", (data) => {
        messages.push({
            id: socket.id,
            name: data.user,
            message: data.message,
            date: new Date().toTimeString()
        });

        io.sockets.emit("userMessage", messages);
    });
});

// Rutas para producto y carrito
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
