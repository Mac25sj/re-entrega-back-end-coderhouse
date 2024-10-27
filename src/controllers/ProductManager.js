import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    //Para leer productos del JSON
    readProduts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    //Función auxiliar para comprobar si el ID existe
    exist = async (id) => {
        let products = await this.readProduts();
        return products.find(prod => prod.id === id)
    }

    // Método para escribir productos en el archivo
    addProducts = async (product) => {
        let productOld = await this.readProduts();
        product.id = nanoid()
        let productAll = [...productOld, product];
        await this.writeProducts(productAll);
        return "Producto agregado"
    };


    //Get product / consigna (Cito función readProducts)
    getProducts = async () => {
        return await this.readProduts()

    };
    //Get product fin

    //Actualizar Producto 
    updateProducts = async (id, product) => {
        let productById = await this.exist(id)///pregunto si esta
        if (!productById) return "⚠️ Producto no encontrado, por favor verificar"
        // si esta, borro producto y despues lo subo modificado
        await this.deleteProducts(id)
        let productOld = await this.readProduts() // Como paso por el delete, ya no tiene el objeto
        let products = [{product, id : id}, ...productOld] 
        await this.writeProducts(products)
        return "💪 Producto actualizado con éxito"
    }
    //Actualizar Producto Fin


    //Get productby ID - Consigna
    getProductsById = async (id) => {
        let productById = await this.exist(id)
        //validación
        if (!productById) return "⚠️ Producto no encontrado, por favor verificar"
        return productById
    };

    //Get productby ID Fin

    //Eliminar Producto 
    deleteProducts = async (id) => {
        let products = await this.readProduts();
        let existProducts = products.some(prod => prod.id === id)
        //some devuelve T or F. valído
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return " ☠️El producto se ha eliminado correctamente"
        }
        return "🤔 El producto que deseas eliminar es inexistente. Verfica nuevamente el ID"

    }
}
//Eliminar Producto fin






export default ProductManager