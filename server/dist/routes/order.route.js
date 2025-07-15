"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
/**
 * @openapi
 * /api/orders/getmany:
 *   get:
 *     summary: Obtiene todas las órdenes
 *     tags:
 *       - Órdenes
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
orderRouter.get("/getmany", order_controller_1.getManyOrdersController);
/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Obtiene una orden por ID
 *     tags:
 *       - Órdenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 */
orderRouter.get("/:id", order_controller_1.getOrderByIdController);
/**
 * @openapi
 * /api/orders/create:
 *   post:
 *     summary: Crea una nueva orden
 *     tags:
 *       - Órdenes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               total:
 *                 type: number
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Orden creada
 *       400:
 *         description: Error de validación
 */
orderRouter.post("/create", order_controller_1.createOrderController);
/**
 * @openapi
 * /api/orders/{id}/status:
 *   put:
 *     summary: Actualiza el estado de una orden
 *     tags:
 *       - Órdenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PAID, SHIPPED, DELIVERED, CANCELLED]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Orden no encontrada
 */
orderRouter.put("/:id/status", order_controller_1.updateOrderStatusController);
exports.default = orderRouter;
