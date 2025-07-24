import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const products = await productService.getAllProductsService(
      {},
      { limit, page }
    );
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductByIdService(req.params.pid);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", error: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProductService(req.body);
    res.status(201).json({ status: "success", product });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProductService(
      req.params.pid,
      req.body
    );
    res.json({ status: "success", product });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProductService(req.params.pid);
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
