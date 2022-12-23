import { Prisma } from "../prisma.js";
import bcryptjs from "bcryptjs";

export const crearRegistro = async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        data.password = bcryptjs.hashSync(data.password,10);

        const nuevoCliente = await Prisma.cliente.create({data});
        console.log(nuevoCliente);

        res.status(201).json({
            message: "Cliente creado exitosamente",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error al crear el cliente",
            content:error.message,
        });
    }
}

export const login = async (req, res) => {
    const data = req.body;
    const clienteEncontrado = await Prisma.cliente.findUnique({
        where: {
            dni: String(data.dni),
        },
    });
    console.log(clienteEncontrado)
    if (!clienteEncontrado){
        return res.status(404).json({
            message:"Cliente no existe",
        })
    }

    
    res.json({
        message:"Bienvenido",
    })

}