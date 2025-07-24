import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  signToken,
  passwordResetToken,
  verifyPasswordResetToken,
} from "../utils/jwt.js";
import { sendPasswordResetEmail } from "../utils/mailer.js";

const userRepository = new UserRepository();
const cartRepository = new CartRepository();

export default class SessionService {
  async registerUserService(userData) {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) throw new Error("User already exists");

    const cart = await cartRepository.createCart({});
    const hashedPassword = await hashPassword(userData.password);

    const newUser = {
      ...userData,
      password: hashedPassword,
      cart: cart._id,
    };

    return await userRepository.createUser(newUser);
  }

  async loginUserService({ email, password }) {
    const user = await userRepository.getUserByEmail(email);
    if (!user || !comparePassword(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const token = signToken({ id: user._id, role: user.role });
    return { token, user };
  }

  async forgotPassword(email) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const token = passwordResetToken(email);

    // Aquí la URL puede venir como parámetro o construirla aquí directamente
    const resetLink = `http://localhost:8080/reset-password?token=${token}`;

    await sendPasswordResetEmail(email, resetLink);

    return { message: "Correo de recuperación enviado" };
  }

  async resetPassword(token, newPassword) {
    const email = verifyPasswordResetToken(token);
    const user = await userRepository.getUserByEmail(email);

    if (!user) throw new Error("Usuario no encontrado");

    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      throw new Error("La nueva contraseña no puede ser igual a la anterior");
    }

    const hashedPassword = await hashPassword(newPassword, 10);
    await userRepository.updateUser(email, { password: hashedPassword });

    return "Contraseña restablecida correctamente";
  }
}
