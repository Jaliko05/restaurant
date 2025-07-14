import { prisma } from "../config/prisma";

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const createUser = async (userData: { name: string; email: string; password: string }) => {
    return await prisma.user.create({
        data: userData,
    });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
}