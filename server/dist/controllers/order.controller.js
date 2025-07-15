var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getManyOrders, createOrder, getOrderById, updateOrderStatus } from "../services/order.service.js";
export const getManyOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield getManyOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
export const getOrderByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield getOrderById(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
});
export const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, total, products } = req.body;
    try {
        const newOrder = yield createOrder(userId, total, products);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});
export const updateOrderStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = yield updateOrderStatus(id, status);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
});
