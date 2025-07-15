import { Router } from "express";
import { generateTestTokenController, verifyTokenController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

/**
 * @openapi
 * /api/auth/test-token:
 *   get:
 *     summary: Genera un token JWT de prueba
 *     tags:
 *       - Autenticación
 *     description: Genera un token JWT de prueba que puedes usar para testear rutas protegidas
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token de prueba generado exitosamente"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                 instructions:
 *                   type: object
 *                   properties:
 *                     usage:
 *                       type: string
 *                     example:
 *                       type: string
 *       500:
 *         description: Error al generar token
 */
authRouter.get('/test-token', generateTestTokenController);

/**
 * @openapi
 * /api/auth/verify:
 *   get:
 *     summary: Verifica un token JWT
 *     tags:
 *       - Autenticación
 *     description: Ruta protegida que verifica si tu token JWT es válido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token válido"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Sin autenticación o token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sin autenticación"
 */
authRouter.get('/verify', authMiddleware, verifyTokenController);

export default authRouter;
