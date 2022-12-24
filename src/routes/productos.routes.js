import { Router } from "express";
import { crearPizza, listarPizzas } from "../controllers/productos.controller.js";

export const productosRouter = Router();

productosRouter.post("/pizza", crearPizza);
productosRouter.get("/pizzas", listarPizzas);