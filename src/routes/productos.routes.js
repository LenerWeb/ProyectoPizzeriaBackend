import { Router } from "express";
import { crearPizza } from "../controllers/productos.controller.js";

export const productosRouter = Router();

productosRouter.post("/pizza",crearPizza);