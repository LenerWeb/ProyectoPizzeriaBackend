import { Router } from "express";
import { actualizarPizzas, crearPizza, listarPizzas } from "../controllers/productos.controller.js";

export const productosRouter = Router();

productosRouter.post("/pizza", crearPizza);
productosRouter.get("/pizzas", listarPizzas);
productosRouter.put("/actualizar-pizzas/:id", actualizarPizzas);
