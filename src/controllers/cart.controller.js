import CartService from "../services/cart.service.js";

const cartService = new CartService();

export const createCart = async (_req, res) => {
  try {
    const newCart = await cartService.createCartService();
    res.status(201).json({ status: "success", cart: newCart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const getCarts = async (_req, res) => {
  try {
    const carts = await cartService.getAllCartsService();
    res.json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartService.getCartByIdService(cid);
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.addProductToCartService(cid, pid);
    res.json({ status: "success", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.removeProductFromCartService(
      cid,
      pid
    );
    res.json({ status: "success", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await cartService.updateCartService(cid, products);
    res.json({ status: "success", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    await cartService.clearCartService(cid);
    res.json({ status: "success", message: "Carrito vaciado" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
