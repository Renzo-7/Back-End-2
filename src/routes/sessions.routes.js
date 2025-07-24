import { Router } from "express";
import { auth } from "../config/passport.js";
import {
  register,
  login,
  current,
  forgotPassword,
  resetPassword,
} from "../controllers/session.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, current);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
