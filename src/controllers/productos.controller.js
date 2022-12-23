import { Prisma } from "../prisma.js";

export const crearPizza = async (req, res) =>{
    const data = req.body;
    try {
        const nuevaPizza = await Prisma.producto.create({
            data,
        });
        res.status(201).json({
            message:"pizza creada",
            content: nuevaPizza,
        });
    } catch (error) {
        console.log("Hay un error")
        res.status(400).json({
            message:"Error al crear un producto",
            error: error.message,
        });
    }
};