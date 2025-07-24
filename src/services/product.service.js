import ProductRepository from "../repositories/product.repository.js";

const productRepository = new ProductRepository();

export default class ProductService {
  async getAllProductsService(filter, options) {
    return await productRepository.getAllProducts(filter, options);
  }

  async getProductByIdService(id) {
    return await productRepository.getProdctById(id);
  }

  async createProductService(productData) {
    return await productRepository.createProduct(productData);
  }

  async updateProductService(id, updateData) {
    return await productRepository.updateProduct(id, updateData);
  }

  async deleteProductService(id) {
    return await productRepository.deleteProduct(id);
  }
}
