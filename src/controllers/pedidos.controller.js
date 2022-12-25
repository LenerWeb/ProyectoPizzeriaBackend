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
            },
            select : {
                id: true,
                clienteId: true,
                cliente: {
                    select:{
                        nombre: true,
                        apellido: true,
                        dni:true,
                        direccion: true,
                    }
                },
                fechaEmision: true,
                detalles: {
                    select: {
                        id: false,
                        producto : {
                            select: {
                                id: true,
                                nombre: true,
                                precio: true,
                            }
                        },
                        cantidad: true,
                        totalVenta: true,
                    }
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

export const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Prisma.cabeceraPedido.findMany({
            select : {
                id: true,
                clienteId: true,
                cliente: {
                    select:{
                        nombre: true,
                        apellido: true,
                        dni:true,
                        direccion: true,
                    }
                },
                fechaEmision: true,
                detalles: {
                    select: {
                        id: false,
                        producto : {
                            select: {
                                id: true,
                                nombre: true,
                                precio: true,
                            }
                        },
                        cantidad: true,
                        totalVenta: true,
                    }
                }
            }
        })
        return res.status(200).json({
            message: "Listar pedidos",
            content: pedidos,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error no se pueden ver los pedidos",
            error: error.message,
        });
    }
};

export const misPedidos = async (req, res) => {
    const { id } = req.user;
    
    try {
        const pedidosPersonal = await Prisma.cabeceraPedido.findMany({
            where: {
                cliente :{
                    id: Number(id),
                }
            },
            select : {
                id: true,
                clienteId: false,
                fechaEmision: true,
                detalles: {
                    select: {
                        id: false,
                        producto : {
                            select: {
                                id: true,
                                nombre: true,
                                precio: true,
                            }
                        },
                        cantidad: true,
                        totalVenta: true,
                    }
                }
            }
        })
        return res.status(200).json({
            message: "Listar pedidos",
            content: pedidosPersonal,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error no se pueden ver los pedidos",
            error: error.message,
        });
    }
};