import {promises as fs} from "fs"

class ProductManager {
  constructor() {
    this.patch = "./productos.txt"
    this.products = [];
  }

  static id = 0

  addProduct = async (title, description, price, img, code, stock) => {

    ProductManager.id++
    let newProduct = {
      title,
      description,
      price,
      img,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct)

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let segundaRespuesta = await this.readProducts()
    return console.log(segundaRespuesta);
  }

  getProductsById = async (id) =>  {
    let tercerRespuesta = await this.readProducts();
    if (!tercerRespuesta.find((product) => product.id === id)) {
      console.log("Producto no encontrado!");
    } else {
      console.log(tercerRespuesta.find((product) => product.id === id));
    }

  };

  deleteProductById = async (id) => {
    let tercerRespuesta = await this.readProducts();
    let productFilter = tercerRespuesta.filter(products => products.id != id);

    console.log();
    await fs.writeFile(this.patch, JSON.stringify(productFilter))

    console.log("Producto eliminado exitosamente!");
  };

  updateProduct = async ({id, ...producto}) => {
    await this.deleteProductById(id);

    let oldProduct = await this.readProducts();

    let productsModified = [
      {...producto, id},
      ...oldProduct
    ]
    await fs.writeFile(this.patch, JSON.stringify(productsModified));
  };


}

const productos = new ProductManager();

productos.addProduct("Title1", "Description1", 1000, "Img1", "Abc123", 5);
productos.addProduct("Title2", "Description2", 2000, "Img2", "Abc123", 10);
productos.addProduct("Title3", "Description3", 3000, "Img3", "Def456", 20);

/* productos.getProducts(); */

productos.getProductsById(2);

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