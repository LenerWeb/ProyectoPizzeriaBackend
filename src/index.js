import express, { json } from "express";

const servidor = express()

servidor.use(json());

const PORT = process.env.PORT ?? 5000;


servidor.listen(PORT,() =>{
    console.log(`servidor levantado exitosamente en puerto ${PORT}`);
});