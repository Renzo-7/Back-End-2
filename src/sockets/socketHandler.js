import Product from "../repositories/dao/models/Product.js";
import Cart from "../repositories/dao/models/Cart.js";

export default function setupWebSockets(io) {
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Enviar productos actuales al conectarse
    socket.on("getProducts", async () => {
      const products = await Product.find();
      socket.emit("products", products);
    });

    // Agregar producto
    socket.on("addProduct", async (productData) => {
      const newProduct = await Product.create(productData);
      socket.emit("productAdded", newProduct);
      const products = await Product.find();
      io.emit("products", products);
    });

    // Eliminar producto
    socket.on("deleteProduct", async (productId) => {
      await Product.findByIdAndDelete(productId);
      const products = await Product.find();
      io.emit("products", products);
    });

    // Obtener carrito
    socket.on("getCart", async (cartId) => {
      try {
        const cart = await Cart.findById(cartId).populate("products.product");
        if (cart) {
          socket.emit("updateCart", cart);
        } else {
          socket.emit("error", "Carrito no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    });

    // Eliminar producto del carrito
    socket.on("deleteProduct", async ({ cartId, productId }) => {
      try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
          socket.emit("error", "Carrito no encontrado");
          return;
        }

        cart.products = cart.products.filter(
          (product) => product.product.toString() !== productId
        );

        await cart.save();
        socket.emit("updateCart", cart);
      } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        socket.emit("error", "Error al eliminar producto del carrito");
      }
    });
  });
}
