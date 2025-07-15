import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateTestTokenController = async (req: Request, res: Response) => {
    try {
        // Datos de prueba para el token
        const testUser = {
            id: "test-user-id",
            email: "test@example.com",
            name: "Test User",
            role: "USER"
        };

        // Generar token con expiración de 1 hora
        const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Token de prueba generado exitosamente",
            token: token,
            user: testUser,
            instructions: {
                usage: "Usa este token en el header Authorization como: Bearer <token>",
                example: `Authorization: Bearer ${token}`
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error al generar token de prueba" });
    }
};

export const verifyTokenController = async (req: Request, res: Response) => {
    try {
        // Este controlador solo se ejecuta si el middleware de autenticación pasó
        res.json({
            message: "Token válido",
            user: (req as any).user,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: "Error al verificar token" });
    }
};
