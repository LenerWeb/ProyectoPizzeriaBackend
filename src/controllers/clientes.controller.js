import { Prisma } from "../prisma.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

    if (bcryptjs.compareSync(data.password, clienteEncontrado.password)) {
        
        const payload = {
            jti: clienteEncontrado.id,
            nombre: clienteEncontrado.nombre
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: "1h",
        });

        res.json({
            message:"Bienvenido",
            content: token,
        });
    } else {
        res.json({
            message: "La contraseña no es valida",
        });
    }
}

export const perfil = async (req, res) => {
    console.log("perfil", req.user);
    const data = req.user;
    
    try {
        const clienteEncontrado = await Prisma.cliente.findUnique({
            where: {
                dni: String(data.dni),
            },
            select: {
                nombre: true,
                apellido: true,
                dni: true,
                email: true,
                direccion: true,
                distrito: true,
            }
        });
        console.log(clienteEncontrado);
        
        return res.status(201).json({
            content: clienteEncontrado,
        });
        

    } catch (error) {
        return res.status(500).json({
            message:"Error inesperado",
            error: error.message,
        })
    };
}

export const listarCliente = async (req, res) => {
    try {
        const clientes = await Prisma.cliente.findMany()
        return res.status(200).json({
            message: "Lista de clientes",
            content: clientes
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error no se puedes ver clientes",
            error: error.message,
        });
    }
};

export const actualizarCliente = async(req, res) => {
    const { id } = req.user;
    const data = req.body
    try {
        const findCliente = await Prisma.cliente.findUnique({
            where: {
                id: Number(id),
            },
        });
        
        const cliente = await Prisma.cliente.update({
            where: { 
                id: Number(id),
            },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                direccion: data.direccion,  
                distrito: data.distrito,
            },
        })
        
        return res.status(201).json({
            message:"Cliente actualizado",
            content: cliente,
        });
    } catch (error) {
        return res.status(500).json({
            message:"Error inesperado",
            error: error.message,
        });
    }
}

export const eliminarCliente = async(req, res) => {
    const { id } = req.user;
    const data = req.body;
    try {
        const buscarCliente = await Prisma.cliente.findUnique({
            where: {
                id: Number(id),
            },
        });
        console.log("buscar", buscarCliente)
        const cliente = await Prisma.cliente.delete({
            where: {
                id: Number(id),
            },
        });
        console.log("eliminar", cliente)

        return res.status(200).json({
            message: "Cliente eliminado",
        });

    } catch (error) {
        return res.status(500).json({
            message:"Error inesperado",
            error: error.message,
        });
    }
}