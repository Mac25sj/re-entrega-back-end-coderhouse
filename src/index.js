import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js"

// Inicio servidor
const app = express();
const PORT = 8080;

// Al trabajar con JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductRouter)


//Para el carrito
app.use("/api/cart", CartRouter)



// Una vez definidos los parámetros anteriores, levanto servidor especificando el puerto
app.listen(PORT, () => {
    console.log(`Servidor con Express trabajando en el puerto: ${PORT} solicitado en la consigna`);
});


