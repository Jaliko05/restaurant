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
exports.updateOrderStatus = exports.createOrder = exports.getOrderById = exports.getManyOrders = void 0;
const prisma_1 = require("../config/prisma");
const getManyOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.order.findMany({
        include: {
            productOrders: {
                include: {
                    product: true
                }
            }
        }
    });
});
exports.getManyOrders = getManyOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.order.findUnique({
        where: { id },
        include: {
            productOrders: {
                include: {
                    product: true
                }
            }
        }
    });
});
exports.getOrderById = getOrderById;
const createOrder = (userId, total, products) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.order.create({
        data: {
            userId,
            total,
            productOrders: {
                create: products.map(p => ({
                    productId: p.productId,
                    quantity: p.quantity,
                })),
            },
        },
        include: {
            productOrders: true,
        },
    });
});
exports.createOrder = createOrder;
const updateOrderStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.order.update({
        where: { id },
        data: { orderStatus: status },
    });
});
exports.updateOrderStatus = updateOrderStatus;
