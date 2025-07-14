import { Router } from "express";
import { getUsersController, createUserController, getUserController } from "../controllers/user.controller";

const userRouter = Router();

/**
 * @openapi
 * /api/users/getmany:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
userRouter.get('/getmany', getUsersController);

/**
 * @openapi
 * /api/users/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error de validación
 */
userRouter.post('/create', createUserController);

/**
 * @openapi
 * /api/users/get:
 *   get:
 *     summary: Obtiene un usuario por email
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
userRouter.get('/get', getUserController);

export default userRouter;