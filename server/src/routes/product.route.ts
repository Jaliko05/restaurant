import { Router } from "express";
import { getManyProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const productRouter = Router();

/**
 * @openapi
 * /api/products/getmany:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
productRouter.get('/getmany', authMiddleware, getManyProductsController);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
productRouter.get('/:id', authMiddleware, getProductByIdController);

/**
 * @openapi
 * /api/products/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
 * security:
 *   - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación
 */
productRouter.post('/create', authMiddleware, createProductController);

/**
 * @openapi
 * /api/products/update/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
productRouter.put('/update/:id', authMiddleware, updateProductController);


/**
 * @openapi
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
productRouter.delete('/delete/:id', authMiddleware, deleteProductController);

export default productRouter;