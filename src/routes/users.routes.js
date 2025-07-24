import { Router } from "express";
import { auth } from "../config/passport.js";
import { authorize } from "../middlewares/authorize.js";
import { getUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();

// Obtener todos los usuarios (solo ADMIN)
router.get("/", auth, authorize("ADMIN"), getUsers);

// Obtener un usuario por ID (solo ADMIN)
router.get("/:uid", auth, authorize("ADMIN"), getUserById);

export default router;
