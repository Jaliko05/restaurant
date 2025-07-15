"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const productRouter = (0, express_1.Router)();
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
productRouter.get('/getmany', product_controller_1.getManyProductsController);
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
productRouter.get('/:id', product_controller_1.getProductByIdController);
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
productRouter.post('/create', product_controller_1.createProductController);
/**
 * @openapi
 * /api/products/{id}:
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
productRouter.put('/:id', product_controller_1.updateProductController);
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
productRouter.delete('/delete/:id', product_controller_1.deleteProductController);
exports.default = productRouter;
