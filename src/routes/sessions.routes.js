import { Router } from "express";
import { auth } from "../config/passport.js";

const router = Router();

router.get("/current", auth, (req, res) => {
  res.json({
    message: "Usuario autenticado",
    user: req.user,
  });
});

export default router;
