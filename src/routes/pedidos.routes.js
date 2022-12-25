import { Router } from "express";
import { crearPedido, listarPedidos, misPedidos } from "../controllers/pedidos.controller.js";
import { security } from "../utils/inspector.js";

export const pedidosRouter = Router();

pedidosRouter.post("/pedido", security, crearPedido);
pedidosRouter.get("/pedidos", listarPedidos);
pedidosRouter.get("/mis-pedidos", security, misPedidos);
