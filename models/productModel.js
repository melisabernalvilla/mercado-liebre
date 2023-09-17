
const fs = require("fs");
const path = require("path");

const modelo = {
  fileRoute: path.join(__dirname, "../data/products.json"),
  //traer todos los productos del json
  findAll: () => {
    //buscamos el contenido del archivo json
    const jsonData = fs.readFileSync(modelo.fileRoute, "utf-8");
    //convertimos el Json en javascript
    const products = JSON.parse(jsonData);

    return products;
  },
  findById: (id) => {
    let products = modelo.findAll();

    const selectedProduct = products.find(
      (productoActual) => productoActual.id == id
    );

    return selectedProduct;
  },

  createProduct: (data) => {
    let products = modelo.findAll();

    const lastProdId = products[products.length - 1].id; //ponemos el ultimo indice de un array de objetos

    const newProduct = {
      id: lastProdId + 1,
      ...data, //express operaitor
    };

    products.push(newProduct);

    //convierte el javascript en json
    const jsonData = JSON.stringify(products);

    //escribe en el json
    fs.writeFileSync(modelo.fileRoute, jsonData, "utf-8")

    
  },

  delete: (id) => {
    let products = modelo.findAll();
    products = products.filter(productoActual => productoActual.id !== id);

    const jsonProducts = JSON.stringify(products);

    fs.writeFileSync(modelo.fileRoute, jsonProducts, "utf-8");
  },

  updateProduct: (update) => {
    //buscar array de productos ya existentes
    let products = modelo.findAll();
    //conseguir en que indice de ese array, esta guardado el producto
    const prodIndex = products.findIndex(productActual=> productActual.id === update.id);
    //modificar el elemento del array en ese indice, por el que nos pararon por parametro
    products[prodIndex] = update;
    //convertir este nuevo array en json
    const productsJson = JSON.stringify(products);
    //guardar todo al JSON
    fs.writeFileSync(modelo.fileRoute, productsJson, "utf-8")
  }
    
}

module.exports = modelo;
