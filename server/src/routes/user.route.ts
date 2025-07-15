import { Router } from "express";
import { getUsersController, createUserController, getUserController, loginController, updateRoleUserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

/**
 * @openapi
 * /api/users/getmany:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
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
userRouter.get('/getmany', authMiddleware, getUsersController);

/**
 * @openapi
 * /api/users/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
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
userRouter.post('/create', authMiddleware, createUserController);

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



/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to login user"
 */
userRouter.post('/login', loginController);


/**
 * @openapi
 * /api/users/update-role:
 *   post:
 *     summary: Actualiza el rol de un usuario
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol de usuario actualizado
 *       500:
 *         description: Error al actualizar el rol del usuario
 */
userRouter.post('/update-role', authMiddleware, updateRoleUserController);

export default userRouter;