import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js"; 

const productManager = new ProductManager();
const ProductRouter = Router();

// Sección getProductById
ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await productManager.getProductsById(id));
});

// Sección getProducts
ProductRouter.get("/", async (req, res) => {
    res.send(await productManager.getProducts());
});

// Eliminar Producto
ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await productManager.deleteProducts(id));
});

// Actualizar Producto
ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let Updateproduct = req.body;
    res.send(await productManager.updateProducts(id, Updateproduct));
});

// Agregar Producto
ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body;
    res.send(await productManager.addProducts(newProduct));
});

export default ProductRouter;
