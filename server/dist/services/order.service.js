var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../config/prisma.js";
export const getManyOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.findMany({
        include: {
            productOrders: {
                include: {
                    product: true
                }
            }
        }
    });
});
export const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.findUnique({
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
export const createOrder = (userId, total, products) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.create({
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
export const updateOrderStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.update({
        where: { id },
        data: { orderStatus: status },
    });
});
