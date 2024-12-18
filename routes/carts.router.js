import express from "express";
import FileManager from "../manager/fileManager.js";
import { readFile } from "fs";

const router = express.Router();
const cartManager = new FileManager("./data/carrito.json");

//funcion para generar el id automaticamente:
const generateId = async () => {
  const carts = await cartManager.readFile();
  if (carts.length === 0) return 1;
  return Math.max(...carts.map((c) => c.id)) + 1;
};

//GET/api/carts
router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.readFile();
    let limit = req.query.limit;
    if (limit) {
      res.send(carts.slice(0, limit));
      //para ver el límite --> http://localhost:8080/api/carts?limit=1
    } else {
      res.send(carts);
      // para ver el array de productos --> http://localhost:8080/api/carts
    }
  } catch (error) {
    res.status(500).json({
      error: "error al obtener el carrito",
      message: error.message,
    });
  }
});

//GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const carts = await cartManager.readFile();
    const cartId = parseInt(req.params.cid);

    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      return res.status(404).json({
        error: "Carrito no encontrado",
      });
    }
    res.json;
  } catch (error) {
    res.status(500).json({
      error: "error al obtener el carrito",
    });
  }
});

//POST/api/carts
router.post("/", async (req, res) => {
  try {
    const carts = await cartManager.readFile();
    // Crear nuevo carrito
    const newCart = {
      id: await generateId(),
      products: [],
    };

    // Agregar el nuevo carrito
    carts.push(newCart);
    await cartManager.writeFile(carts);

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el carrito",
      message: error.message,
    });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const carts = await cartManager.readFile();
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    // buscar el carrito
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Buscar si el producto ya está en el carrito
    const productInCart = cart.products.find((p) => p.id === productId);
    if (productInCart) {
      // Si el producto ya está, aumentar cantidad
      productInCart.quantity++;
    } else {
      // Si el producto no está, agregarlo con cantidad 1
      cart.products.push({
        id: productId,
        quantity: 1,
      });
    }
    await cartManager.writeFile(carts);
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      error: "Error al agregar producto al carrito",
      message: error.message,
    });
  }
});

export { router as cartsRouter };
