import { Prisma } from "../prisma.js";

export const crearRegistro = async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const nuevoCliente = await Prisma.cliente.create({data});
        console.log(nuevoCliente);
        res.status(201).json({
            message: "Cliente creado exitosamente",
        });
    } catch (error) {
        res.status(500).json({
            message:"Error al crear el cliente",
            content:error.message,
        });
    }


}