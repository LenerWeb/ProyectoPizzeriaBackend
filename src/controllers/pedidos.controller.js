import { Prisma } from "../prisma.js";

export const crearPedido = async (req, res) =>{
    const data = req.body;
    console.log("datos", data);
    try {
        const pedidos = await Prisma.cabeceraPedido .create({
            data: {
                clienteId: data.clienteId,
                fechaEmision: data.fechaEmision,
                detalles: {
                    create: data.detalles,
                }
            }
        });

        console.log("pedidos", pedidos);

        return res.status(201).json({
            message: "Su pedido fue registrado",
            content: pedidos,
        });
        

    } catch (error) {
        return res.status(500).json({
            message:"Error en el servidor",
            error: error.message,
        });
    }
};