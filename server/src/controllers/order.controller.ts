import { Request, Response } from "express";
import { getManyOrders, createOrder, getOrderById, updateOrderStatus } from "../services/order.service.js";

export const getManyOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await getManyOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await getOrderById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

export const createOrderController = async (req: Request, res: Response) => {
    const { userId, total, products } = req.body;
    try {
        const newOrder = await createOrder(userId, total, products);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

export const updateOrderStatusController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = await updateOrderStatus(id, status);
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
};
