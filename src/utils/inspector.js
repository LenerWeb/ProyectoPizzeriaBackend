import jsonwebtoken from "jsonwebtoken";
import { Prisma } from "../prisma.js";

export const security = async (req, res, next) => {
    console.log("soy un midleware")
    
    if(!req.headers.authorization){
        return res.status(401).json({
            message: "Necesitas una token para esta operacion",
        });
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    try {
        const resultado = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(resultado)

        const clienteEncontrado = await Prisma.cliente.findFirst({
            where: {
                id: resultado.jti,
            }
        });
                
        if(!clienteEncontrado) {
            throw new Error("Cliente no existe");
        }
        
        req.user = clienteEncontrado

        next();
        
    } catch (error) {
        return res.status(400).json({
            message: "Token invalida",
            content: error.message,
        });
    }

}