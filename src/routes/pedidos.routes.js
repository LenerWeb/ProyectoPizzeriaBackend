import { Router } from "express";
import { crearPedido, listarPedidos } from "../controllers/pedidos.controller.js";

export const pedidosRouter = Router();

pedidosRouter.post("/pedido", crearPedido);
pedidosRouter.get("/pedidos", listarPedidos);
