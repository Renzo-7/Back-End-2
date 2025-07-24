import { Router } from "express";
import { auth } from "../config/passport.js";
import { authorize } from "../middlewares/authorize.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Obtener todos los productos
router.get("/", getProducts);

// Obtener producto por ID
router.get("/:pid", getProductById);

// Agregar un producto (solo ADMIN)
router.post("/", auth, authorize("ADMIN"), createProduct);

// Actualizar un producto (solo ADMIN)
router.put("/:pid", auth, authorize("ADMIN"), updateProduct);

// Eliminar un producto (solo ADMIN)
router.delete("/:pid", auth, authorize("ADMIN"), deleteProduct);

export default router;
