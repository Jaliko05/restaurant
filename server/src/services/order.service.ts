import { prisma } from "../config/prisma";


export const getManyOrders = async () => {
    return await prisma.order.findMany({
        include: {
            productOrders: {
                include: {
                    product: true
                }
            }
        }
    });
}

export const getOrderById = async (id: string) => {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            productOrders: {
                include: {
                    product: true
                }
            }
        }
    });
};

export const createOrder = async (
    userId: string,
    total: number,
    products: Array<{ productId: string; quantity: number }>
) => {
    return await prisma.order.create({
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
};

export const updateOrderStatus = async (id: string, status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED") => {
    return await prisma.order.update({
        where: { id },
        data: { orderStatus: status },
    });
};


