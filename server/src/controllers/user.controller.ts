import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};