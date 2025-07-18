"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusController = exports.createOrderController = exports.getOrderByIdController = exports.getManyOrdersController = void 0;
const order_service_1 = require("../services/order.service");
const getManyOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_service_1.getManyOrders)();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
exports.getManyOrdersController = getManyOrdersController;
const getOrderByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield (0, order_service_1.getOrderById)(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
});
exports.getOrderByIdController = getOrderByIdController;
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, total, products } = req.body;
    try {
        const newOrder = yield (0, order_service_1.createOrder)(userId, total, products);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});
exports.createOrderController = createOrderController;
const updateOrderStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = yield (0, order_service_1.updateOrderStatus)(id, status);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
});
exports.updateOrderStatusController = updateOrderStatusController;
