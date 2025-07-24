import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Conexión con el mailer establecida correctamente");
  })
  .catch((err) => {
    console.error("Error al conectar con el mailer:", err);
  });

export const sendPasswordResetEmail = async (to, link) => {
  try {
    const result = await transporter.sendMail({
      from: "MiTienda <renzo@mail.com>",
      to,
      subject: "Recuperación de contraseña",
      text: `Hola, haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${link}`,
    });

    console.log("Correo enviado:", result.messageId);
    console.log("Vista previa:", nodemailer.getTestMessageUrl(result));
  } catch (error) {
    console.error("Error enviando correo de recuperación:", error);
    throw error; // Para que el controller sepa que hubo error
  }
};
