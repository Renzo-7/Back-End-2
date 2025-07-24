import { Router } from "express";
import { auth } from "../config/passport.js";
import { authorize } from "../middlewares/authorize.js";
import {
  createCart,
  getCartById,
  addProductToCart,
  getCarts,
  removeProductFromCart,
  clearCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = Router();

// Obtener todos los carritos
router.get("/", getCarts);

// Obtener los productos de un carrito
router.get("/:cid", getCartById);

// Crear un nuevo carrito vacío
router.post("/", createCart);

// Agregar un producto al carrito (solo USER)
router.post("/:cid/product/:pid", auth, authorize("USER"), addProductToCart);

// Eliminar un producto del carrito (solo USER)
router.delete(
  "/:cid/products/:pid",
  auth,
  authorize("USER"),
  removeProductFromCart
);

// Eliminar todos los productos del carrito (solo USER)
router.delete("/:cid", auth, authorize("USER"), clearCart);

// Reemplazar productos del carrito (solo USER)
router.put("/:cid", auth, authorize("USER"), updateCart);

export default router;
