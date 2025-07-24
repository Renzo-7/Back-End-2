import CartModel from "../models/Cart.js";

export default class CartDAO {
  async getAll() {
    return await CartModel.find();
  }

  async getById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  async create() {
    return await CartModel.create({ products: [] });
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async update(cartId, newProducts) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { products: newProducts },
      { new: true }
    );
  }

  async delete(cartId) {
    return await CartModel.findByIdAndDelete(cartId);
  }

  async removeProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    return await cart.save();
  }

  async clearCart(cartId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true }
    );
  }
}
