import { prisma } from "../config/prisma";


export const getManyProducts = async () => {
    return await prisma.product.findMany();
};

export const getProductById = async (id: string) => {
    return await prisma.product.findUnique({
        where: { id: id.toString() },
    });
};

export const createProduct = async (productData: { name: string; price: number; description?: string }) => {
    return await prisma.product.create({
        data: productData,
    });
};

export const updateProduct = async (id: string, productData: { name?: string; price?: number; description?: string }) => {
    return await prisma.product.update({
        where: { id: id },
        data: productData,
    });
};