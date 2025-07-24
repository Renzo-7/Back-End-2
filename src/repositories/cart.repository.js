import CartDAO from "./dao/daos/cart.dao.js";

const cartDAO = new CartDAO();

export default class CartRepository {
  async getAllCarts() {
    return await cartDAO.getAll();
  }

  async getCartById(id) {
    return await cartDAO.getById(id);
  }

  async createCart() {
    return await cartDAO.create();
  }

  async addProductToCart(cartId, productId, quantity) {
    return await cartDAO.addProduct(cartId, productId, quantity);
  }

  async updateCart(cartId, products) {
    return await cartDAO.update(cartId, products);
  }

  async deleteCart(cartId) {
    return await cartDAO.delete(cartId);
  }

  async removeProductFromCart(cartId, productId) {
    return await cartDAO.removeProduct(cartId, productId);
  }

  async clearCart(cartId) {
    return await cartDAO.clearCart(cartId);
  }
}
