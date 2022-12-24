import { Router } from "express";
import { actualizarCliente, crearRegistro, listarCliente, login, perfil } from "../controllers/clientes.controller.js";
import { security } from "../utils/inspector.js";

export const clientesRouter = Router();

clientesRouter.post("/registro", crearRegistro);
clientesRouter.post("/login", login);
clientesRouter.get("/perfil", security, perfil);
clientesRouter.get("/clientes", listarCliente);
clientesRouter.put("/cliente/:id", actualizarCliente);