import { promises as fs } from "fs";

class ProductManager {
  constructor(filepatch) {
    this.patch = filepatch;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      await fs.access(this.patch);
      const data = await fs.readFile(this.patch, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.patch, JSON.stringify(this.products));
      console.log("Productos guardados exitosamente en el archivo.");
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error);
    }
  }

  generateId() {
    let maxId = 0;
    for (const product of this.products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  async readProducts() {
    try {
      const data = await fs.readFile(this.patch, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      return [];
    }
  }

  async addProduct(title, description, price, img, code, stock) {
    const productoExistente = this.products.find((product) => product.code === code);
  
    if (productoExistente) {
      console.log(`El producto con código ${code} ya está agregado.`);
    } else {
      const id = this.generateId();
  
      let newProduct = {
        title,
        description,
        price,
        img,
        code,
        stock,
        id,
      };

      this.products.push(newProduct);

      await this.saveProducts();
      console.log("Producto agregado exitosamente.");
    }
  }

  generateId() {
    let maxId = 0;
    for (const product of this.products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  getProducts = async () => {
    let segundaRespuesta = await this.readProducts();
    console.log(segundaRespuesta);
  }

  async getProductsById(id) {
    try {
      let tercerRespuesta = await this.readProducts();
      const product = tercerRespuesta.find((product) => product.id === id);
      if (!product) {
        console.log("Producto no encontrado!");
      } else {
        console.log(product);
      }
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
    }
  }

  deleteProductById = async (id) => {
    const productIndex = this.products.findIndex((product) => product.id === id);
    
    if (productIndex === -1) {
      console.log("Producto no encontrado!");
      return;
    }

    this.products.splice(productIndex, 1);

    await this.saveProducts();
    console.log("Producto eliminado exitosamente!");
  };

  updateProduct = async ({ id, ...producto }) => {
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      console.log("Producto no encontrado!");
      return;
    }

    this.products[productIndex] = { ...producto, id };

    await this.saveProducts();
    console.log("Producto actualizado exitosamente!");
  };
}

const productos = new ProductManager("./productos.txt");

productos.addProduct("Title1", "Description1", 1000, "Img1", "Abc123", 5);
productos.addProduct("Title2", "Description2", 2000, "Img2", "Abc123", 10);
productos.addProduct("Title3", "Description3", 3000, "Img3", "Def456", 20);
productos.addProduct("Title4", "Description4", 4000, "Img5", "Asd732", 30);
productos.addProduct("Title4", "Description4", 5000, "Img6", "Fkl920", 40);

productos.getProducts(); 

/* productos.getProductsById(2);  */

/* productos.updateProduct({
  title: 'Title3',
  description: 'Description3',
  price: 4500,
  img: 'Img3',
  code: 'Def456',
  stock: 20,
  id: 3
}); */

/* productos.deleteProductById(2); */


