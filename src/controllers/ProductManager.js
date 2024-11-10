import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    // Método para leer productos del JSON
    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    // Método para escribir productos en el archivo JSON
    writeProducts = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    // Función auxiliar para comprobar si el ID existe
    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id);
    }

    // Método para agregar productos
    addProducts = async (product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid();
        let productsAll = [...productsOld, product];
        await this.writeProducts(productsAll);
        return "Producto agregado";
    };

    // Método para obtener todos los productos
    getProducts = async () => {
        return await this.readProducts();
    };

    // Método para actualizar un producto
    updateProducts = async (id, product) => {
        let productById = await this.exist(id);
        if (!productById) return "⚠️ Producto no encontrado, por favor verificar";
        
        // Eliminar el producto antiguo y añadir el actualizado
        let productsOld = await this.readProducts(); 
        let products = productsOld.filter(prod => prod.id !== id);
        products.push({ ...productById, ...product, id: id });

        await this.writeProducts(products);
        return "💪 Producto actualizado con éxito";
    }

    // Método para obtener un producto por ID
    getProductsById = async (id) => {
        let productById = await this.exist(id);
        if (!productById) return "⚠️ Producto no encontrado, por favor verificar";
        return productById;
    };

    // Método para eliminar un producto
    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id);
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id !== id);
            await this.writeProducts(filterProducts);
            return "☠️ El producto se ha eliminado correctamente";
        }
        return "🤔 El producto que deseas eliminar es inexistente. Verifica nuevamente el ID";
    }
}

export default ProductManager;
