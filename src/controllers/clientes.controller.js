import { Prisma } from "../prisma.js";

export const crearRegistro = async (req, res) => {
    const data = req.body;
    console.log(data);

    res.status(201).json({
        message: "Cliente creado exitosamente",
    });


}