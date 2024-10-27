import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

// Creo nueva Constante 
const ProductAll = new ProductManager();

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    // Método para leer los carritos desde el archivo
    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    }

    // Método para escribir los carritos en el archivo
    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    // Método para verificar la existencia de un carrito
    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    }

    // Método para agregar carritos
    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid();
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld];
        await this.writeCarts(cartsConcat);
        return "Carrito agregado";
    }

    // Método para obtener carrito por ID
    getCartsById = async (id) => {
        let cartById = await this.exist(id);
        if (!cartById) return "⛔ Carrito no encontrado, por favor verificar";
        return cartById;
    }

    // Método para agregar productos en el carrito
    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId);
        if (!cartById) return "⛔ Carrito no encontrado, por favor verificar";

        // Compruebo a ver si existe el producto
        let productById = await ProductAll.exist(productId);
        if (!productById) return "Producto no encontrado";

        // Traigo los carritos
        let cartsAll = await this.readCarts();

        // Validación
        if (cartById.products.some(prod => cart.id === cartId)) {
            let productInCart = cartById.products.find(prod => prod.id === productId);
            productInCart.cantidad++; // Si el producto está, agrego 1
        } else {
            let cartFilter = cartsAll.filter(cart => prod.id != cartId); // Filtro los carritos
            let cartsConcat = [{ id: cartId, products: [{ id: productById.id, cantidad: 1 }] }, ...cartFilter];
            await this.writeCarts(cartsConcat);
            return "Producto agregado correctamente";
        }

        await this.writeCarts(cartsAll); // Escribo los carritos actualizados
        return "Producto sumando al carrito";
    }
}

// Exporto CartManager
export default CartManager;
