import { Request, Response } from "express";
import { getAllUsers, getUserByEmail, createUser, login } from "../services/user.service";


export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const createUserController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await createUser({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
}

export const getUserController = async (req: Request, res: Response) => {
    const { email } = req.query;
    console.log("Email query parameter:", req.query);
    if (typeof email !== "string") {
        return res.status(400).json({ error: "Email query parameter is required and must be a string" });
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await login(email, password);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: "Invalid credentials" });
    }
}