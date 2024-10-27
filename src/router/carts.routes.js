import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

// Ruta para agregar carritos
CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts());
});

// Ruta para obtener todos los carritos
CartRouter.get("/", async (req, res) => {
    res.send(await carts.readCarts());
});

// Ruta para obtener carrito por ID
CartRouter.get("/:id", async (req, res) => {//Recibo 2 ID
    res.send(await carts.getCartsById(req.params.id));
});

CartRouter.post('/:cid/products/:pid', async (req, res) =>{
let cartID = req.params.cid
let productId = req/params.pid
res.send(await carts.addProductsInCart (cartId, productId))

}) 


export default CartRouter;
