import express, { json } from "express";
import { productosRouter } from "./routes/productos.routes.js";
import { clientesRouter } from "./routes/cliente.routes.js";
import { Sql, sqltag } from "@prisma/client/runtime/index.js";

const servidor = express()

servidor.use(json());

const PORT = process.env.PORT ?? 5000;

servidor.use(productosRouter);
servidor.use(clientesRouter);

servidor.listen(PORT, async () =>{
    console.log(`servidor levantado exitosamente en puerto ${PORT}`);
    try {
        await process.env.DATABASE_URL
        console.log("Conexion exitosa a la base de datos")
    } catch (error) {
        console.log("Error al conectarse a la base de datos")
    }
});