import ProductDAO from "./dao/daos/product.dao.js";

const productDAO = new ProductDAO();

export default class ProductRepository {
  async getAllProducts(filter = {}, options = {}) {
    return await productDAO.getAll(filter, options);
  }

  async getProdctById(id) {
    return await productDAO.getById(id);
  }

  async createProduct(data) {
    return await productDAO.create(data);
  }

  async updateProduct(id, data) {
    return await productDAO.update(id, data);
  }

  async deleteProduct(id) {
    return await productDAO.delete(id);
  }
}
