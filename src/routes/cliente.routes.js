import { Router } from "express";
import { crearRegistro } from "../controllers/clientes.controller.js";

export const clientesRouter = Router();

clientesRouter.post("/registro", crearRegistro);
