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
        console.log(nuevaPizza)
    } catch (error) {
        console.log("Hay un error")
        res.status(400).json({
            message:"Error al crear un producto",
            error: error.message,
        });
    }
};

export const listarPizzas = async (req, res) => {
    try {
        const pizzas = await Prisma.producto.findMany()
        console.log(pizzas);
        return res.status(200).json({
            message: "Lista de Pizzas",
            content: pizzas,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
}

export const actualizarPizzas = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const buscarPizza = await Prisma.producto.findUnique({
            where : {
                id : Number(id),
            },
        });

        if (!buscarPizza) {
            return res.status(404).json({
                message: " Pizza no encontrada"
            });
        };
        const pizza = await Prisma.producto.update({
            where : {
                id : Number(id),
            },
            data : {
                nombre: data.nombre,
                precio: data.precio,
                disponibilidad: data.disponibilidad,
                cantidad: data.cantidad,                
            }
        });
        
        return res.status(201).json({
            message: "Producto actualizado",
            content: pizza,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
}