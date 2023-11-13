const products = require("../data/fakeProducts.json"); 

class ProductService{
    static findAll(){
        return products;
    }

    static findById(id){
        const product = products.find((product) => {
            return product.id === parseInt(id);
        });
        return product;
    }
    
    static addProduct(product) {
        product.id = products.length + 1;
        products.push(product);
        return product;
      }
    
}

module.exports = ProductService;