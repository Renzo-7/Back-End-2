import { Router } from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { auth } from "../config/passport.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", auth, authorize("ADMIN"), getUsers);
router.get("/:uid", auth, authorize("ADMIN"), getUser);
router.put("/:uid", auth, authorize("ADMIN"), updateUser);
router.delete("/:uid", auth, authorize("ADMIN"), deleteUser);

export default router;
