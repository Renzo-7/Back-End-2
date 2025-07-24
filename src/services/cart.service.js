import CartRepository from "../repositories/cart.repository.js";

const cartRepository = new CartRepository();

export default class CartService {
  async getAllCartsService() {
    return await cartRepository.getAllCarts();
  }

  async getCartByIdService(id) {
    return await cartRepository.getCartById(id);
  }

  async createCartService() {
    return await cartRepository.createCart();
  }

  async addProductToCartService(cartId, productId, quantity) {
    return await cartRepository.addProductToCart(cartId, productId, quantity);
  }

  async updateCartService(cartId, products) {
    return await cartRepository.updateCart(cartId, products);
  }

  async deleteCartService(cartId) {
    return await cartRepository.deleteCart(cartId);
  }

  async removeProductFromCartService(cartId, productId) {
    return await cartRepository.removeProductFromCart(cartId, productId);
  }

  async clearCartService(cartId) {
    return await cartRepository.clearCart(cartId);
  }
}
