import { Router } from "express";
import { getManyProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from "../controllers/product.controller";

const productRouter = Router();

/**
 * @openapi
 * /api/products/getmany:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags:
 *       - Productos
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
productRouter.get('/getmany', getManyProductsController);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags:
 *       - Productos
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
productRouter.get('/:id', getProductByIdController);

/**
 * @openapi
 * /api/products/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
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
productRouter.post('/create', createProductController);

/**
 * @openapi
 * /api/products/update/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags:
 *       - Productos
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
productRouter.put('/update/:id', updateProductController);


/**
 * @openapi
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - Productos
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
productRouter.delete('/delete/:id', deleteProductController);

export default productRouter;