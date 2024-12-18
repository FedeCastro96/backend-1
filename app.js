import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";

const app = express();
const PUERTO = 8080;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
//-->app.use: Se utiliza para montar middleware o routers y no depende de un método HTTP específico.
//-->app.get: Define un manejador para solicitudes con el método HTTP específico (GET) y una ruta exacta.

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.get("/", (req, res) => {
  res.send("Hola Entrega 1");
});

//iniciar servidor
app.listen(PUERTO, () => {
  console.log("Escuchando el puerto:", PUERTO);
});
