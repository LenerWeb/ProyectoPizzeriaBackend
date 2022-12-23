import { Router } from "express";
import { crearRegistro, login } from "../controllers/clientes.controller.js";

export const clientesRouter = Router();

clientesRouter.post("/registro", crearRegistro);
clientesRouter.post("/login", login);