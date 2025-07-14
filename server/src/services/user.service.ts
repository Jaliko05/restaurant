import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};
export const createUser = async (userData: { name: string; email: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        },
    });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
}

export const login = async (email: string, password: string) => {
    // Busca el usuario por email
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};